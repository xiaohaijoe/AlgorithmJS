## React

1. <a href="#process">执行过程</a>
2. <a href="#double-cache">双缓冲机制</a>
3. <a href="#diff">diff 算法</a>

## <a name='process'>执行过程

**准备阶段**

1. beginWork

![协调阶段遍历](assets/2.png)

![协调阶段遍历](assets/3.png)

beginWork(绿色)/completeWork(蓝色) 遍历规则

```javascript
ReactDOM {
  .render() {
    ReactDOMLegacy {
      .render() {
        LegacyRenderSubtreeIntoContainer() {
          ReactFiberReconciler {
            .updateContainer() {
              ReactFiberWorkLoop{
                .scheduleUpdateOnFiber() {
                  // 创建rootFiber，即render方法中的container
                  .markUpdateLaneFromFiberToRoot();
                  .ensureRootIsScheduled() {
                    // 使用该方法将任务按时间切片执行
                    .scheduleCallback(.performConcurrentWorkOnRoot());
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.performConcurrentWorkOnRoot() {
  // 创建workInProgress（或用旧的workInProgress）
  .prepareFreshStack();
  .workLoopConcurrent() {
    // 利用双缓冲机制，构造新的fiber tree
    // 利用时间切片，此过程可中断
    // 遍历fiber tree
    while(workInProgress !== null && !shouldYield()) {
      .performUnitOfWork();
    }
  }
}

```

**reconcile（协调）阶段**

```javascript
.performUnitOfWork() {
  next = beginWOrk() {
    // 遍历fiber tree：先儿子，后弟弟，再叔叔
    ReactFiberBeginWork {
      .beginWork() {
        switch(workInProgress.tag) {
          case HostRoot: // root fiber
            // ...
          case HostComponent: // 源生DOM节点
            // ...
          case ClassComponent: // class组件
            // 构造实例 createInstance -> constructor -> componentWillMount/componentWillUpdate
            return updateClassComponent() {
              // 再遍历子组件
              .reconcileChildren();
            }
          case FunctionComponent: // function组件
            return updateFunctionComponent() {
              // 每次执行时记录当前hook到全局变量
              ReactFiberHooks {
                .renderWithHooks() {
                  ReactCurrentDispatcher.current = HooksDispatcherOnMount or HooksDispatcherOnUpdate;
                }
                // 把虚拟DOM转成Fiber节点，生成deletions，节点对比复用，更新fiber.alternate, fiber.flags
                .rendercileChildren();
              }
            }
        }
      }
    }
  }
  // 如果已经遍历完成
  if(next == null) {
    // 得到最后一个fiber，即unitOfWork，执行完成操作
    .completeUnitOfWork();
  } else {
    // 继续遍历
    workInProgress = next;
  }
}
```

1. completeWork

```javascript
.completeUnitOfWork(unitOfWork) {
  let completeWork = unitOfWork;
  do {
    const returnFiber = completedWork.return;
    if(...) {
      let next;
      next = completeWork();
      if(next !== null) {
        workInProgress = next;
        return
      }
    }
    const siblingFiber = completedWork.sibling;
    if(siblingFiber !== null) {
      workInProgress = siblingFiber;
      return;
    }
    completedWork = returnFiber;
    workInProgress = completedWork;
  }while(completedWork !== null);
}

ReactFiberCompleteWork {
  .completeWork() {
    switch (workInProgress.tag) {
      case FunctionComponent:
      case ClassComponent:
      case ...:
        .bubbleProperties(); // 手机effects到fiber.subtreeflags
      case HostComponent:
        .updateHostComponent() {
          ReactDOMHostConfig {
            .prepareUpdate() {
              .diffProperties(); // 对比源生DOM属性
            }
          }
        }
    }
  }
}
```

**commit（提交）阶段**

```javascript
.performConcurrentWorkOnRoot() {
  .renderRootConcurrent();
  .finishConcurrentRender() {
    .commitRoot() { // 传入root fiber，从root fiber开始遍历
      commitImpl() {
        // 根据 subtreeflags 判断是否有更新
        let subtreeHasEffects;
        //保存前一次的数据：getSnapshotBeforeUpdate
        .commitBeforeMutationEffects() {
          .commitBeforeMutationEffectDeletions();
          .commitBeforeMutationEffects();
        }
        .commitMutationEffects() {
          // 把deletions收集到第1个节点，只需要遍历child即可
          .commitEffectsDeletions(fiber.deletions) {
            .componentWillUnmount(); // fiber.deletion 属性保留
            .commitNestedUnmounts() {
              .commitDeletion(); // 执行DOM删除，instance.removeChild
            }
          }
          .commitMutationEffectsImpl() {
            switch(fiber.flags) {
              case Placement:
                .comitPlacement();
              case PlacementAnUpdate:
                .commitPlacement();
                .commitWork();
              case Update:
                commitWork();
            }
          }
        }
        .commitLayoutEffects() {
          .commitLifeCycles() {
            switch(fiber.tag) {
              case FunctionComponent:
                .commitHookEffectListMount();
              case ClassComponent:
                // ...
                .instance.componentDidMount();
                // or
                .instance.componentDidUpdate();
            }
          }
        }
      }
    }
  }
}

ReactFiberCommitWork {
  // flags: Placement
  .commitPlacement() {
    .insertOrAppendPlacementNode() {
      .insertBefore();
      .appendChild();
    }
  }
  // flags: Update
  .commitWOrk() {
    switch(finishWork.tag) {
      case FunctionComponent:
        // 如果是 function 组件, Unmount，清空deletions
        .commitHookEffectListUnmount() {
          .safelyCallDestory();
        }
      case HostComponent:
        // 如果是DOM元素
        .commitUpdate(oldProps = current.memoizedProps, newProps = finishWork.memoizedProps) {
          // 设置新属性并提交到DOM元素
          .updateDOMProperties() {
            .setValueForStyles();
            .setInnerHTML();
            .setValueForProperty() {
              // 用正则表达式判断属性名是否合法
              if(isAttributeNameSafe(name)) {
                node.removeAttribute();
                // or
                node.setAttribute();
              }
            }
          }
        }
    }
  }
}
```

## <a name='double-cache'>双缓冲机制

![双缓冲](assets/1.png)

双缓冲根 Fiber，reconcileChildren 阶段

## <a name='diff'>diff 算法

主要是 reconcileChildren -> reconcileChildrenArray()的遍历

1. 第一遍历新数组，新老数组 index 进行对比，通过 updateSlot 方法找到可以复用的节点，直到找到不可复用的节点就退出循环

![diff](assets/4.jpg)

2. 第一遍历完之后，删除剩余的老节点，追加剩余的新节点的过程。如果是新节点已遍历完成，就将剩余的老节点批量删除。
3. 如果是老节点遍历完成仍有新节点剩余，则将新节点插入。

![diff](assets/5.jpg)

4. 把所有老数组元素按 key 或 index 放 Map 里，然后遍历新数组，插入老数组的元素，这是移动的情况。

![diff](assets/6.jpg)
