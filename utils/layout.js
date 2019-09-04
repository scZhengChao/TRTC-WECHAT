class Layouter {
  constructor(containerWidth, containerHeight) {
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
  }

  getSize(media, camera) {
    const totalUser = media.length
    let sizes = [];
    let videoContainerHeight = this.containerHeight;
    let videoContainerWidth = this.containerWidth;
    switch (totalUser) {
      case 0:
        return [];
      case 1:
        return [{
          x: 0,
          y: 0,
          width: videoContainerWidth,
          height: videoContainerHeight
        }];
      case 2:
        let arr = []
          // 判断是否为音频格式
        if (!camera) {
          arr = [{
              x: 0,
              y: 0,
              width: 0,
              height: 0
            },
            {
              x: 0,
              y: 0,
              width: videoContainerWidth,
              height: videoContainerHeight
            }
          ];
        } else {
          arr = [{
              x: 0,
              y: 0,
              width: videoContainerWidth,
              height: videoContainerHeight / 2
            },
            {
              x: 0,
              y: videoContainerHeight / 2,
              width: videoContainerWidth,
              height: videoContainerHeight / 2
            }
          ];
        }
        return arr
      case 3:
        let space = 22;
        if (camera) {
          return [{
            x: 0,
            y: 0,
            width: videoContainerWidth,
            height: videoContainerHeight * 2 / 5 + 40
          }, {
            x: space,
            y: videoContainerHeight * 2 / 5 + 70,
            width: videoContainerWidth / 2 - space * 2,
            height: videoContainerHeight * 1.8 / 5
          }, {
            x: videoContainerWidth / 2 + space,
            y: videoContainerHeight * 2 / 5 + 70,
            width: videoContainerWidth / 2 - space * 2,
            height: videoContainerHeight * 1.8 / 5
          }];
        } else {
          return [{
            x: 0,
            y: 0,
            width: videoContainerWidth,
            height: videoContainerHeight - videoContainerWidth / 1
          }, {
            x: 0,
            y: videoContainerHeight - videoContainerWidth / 1,
            width: videoContainerWidth,
            height: videoContainerWidth / 1
          }, {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }];
        }

      case 4:
        return [{
          x: 0,
          y: 0,
          width: videoContainerWidth / 2,
          height: videoContainerHeight / 2
        }, {
          x: videoContainerWidth / 2,
          y: 0,
          width: videoContainerWidth / 2,
          height: videoContainerHeight / 2
        }, {
          x: 0,
          y: videoContainerHeight / 2,
          width: videoContainerWidth / 2,
          height: videoContainerHeight / 2
        }, {
          x: videoContainerWidth / 2,
          y: videoContainerHeight / 2,
          width: videoContainerWidth / 2,
          height: videoContainerHeight / 2
        }];
      case 5:
        return [{
          x: 0,
          y: 0,
          width: videoContainerWidth / 2,
          height: videoContainerHeight * 3 / 5
        }, {
          x: videoContainerWidth / 2,
          y: 0,
          width: videoContainerWidth / 2,
          height: videoContainerHeight * 3 / 5
        }, {
          x: 0,
          y: videoContainerHeight * 3 / 5,
          width: videoContainerWidth / 3,
          height: videoContainerHeight * 2 / 5
        }, {
          x: videoContainerWidth / 3,
          y: videoContainerHeight * 3 / 5,
          width: videoContainerWidth / 3,
          height: videoContainerHeight * 2 / 5
        }, {
          x: videoContainerWidth * 2 / 3,
          y: videoContainerHeight * 3 / 5,
          width: videoContainerWidth / 3,
          height: videoContainerHeight * 2 / 5
        }];
      case 6:
        return [{
            x: 0,
            y: 0,
            width: videoContainerWidth * 2 / 3,
            height: videoContainerHeight * 3 / 5
          },
          {
            x: videoContainerWidth * 2 / 3,
            y: 0,
            width: videoContainerWidth * 1 / 3,
            height: videoContainerHeight * 3 / 5 / 2
          },
          {
            x: videoContainerWidth * 2 / 3,
            y: videoContainerHeight * 3 / 5 / 2,
            width: videoContainerWidth * 1 / 3,
            height: videoContainerHeight * 3 / 5 / 2
          }, {
            x: 0,
            y: videoContainerHeight * 3 / 5,
            width: videoContainerWidth / 3,
            height: videoContainerHeight * 2 / 5
          }, {
            x: videoContainerWidth / 3,
            y: videoContainerHeight * 3 / 5,
            width: videoContainerWidth / 3,
            height: videoContainerHeight * 2 / 5
          }, {
            x: videoContainerWidth * 2 / 3,
            y: videoContainerHeight * 3 / 5,
            width: videoContainerWidth / 3,
            height: videoContainerHeight * 2 / 5
          }
        ];
      case 7:
        return [{
            x: 0,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 3
          },
          {
            x: videoContainerWidth / 2,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 3
          },
          {
            x: 0,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 3
          },
          {
            x: videoContainerWidth / 2,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 3
          }, {
            x: 0,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }, {
            x: videoContainerWidth / 3,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }, {
            x: videoContainerWidth * 2 / 3,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }
        ];
      case 8:
        return [{
            x: 0,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: videoContainerWidth / 3,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 2 * videoContainerWidth / 3,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 0,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 3
          },
          {
            x: videoContainerWidth / 2,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 3
          }, {
            x: 0,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }, {
            x: videoContainerWidth / 3,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }, {
            x: videoContainerWidth * 2 / 3,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }
        ];
      case 9:
        return [{
            x: 0,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: videoContainerWidth / 3,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 2 * videoContainerWidth / 3,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 0,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: videoContainerWidth / 3,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 2 * videoContainerWidth / 3,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 0,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }, {
            x: videoContainerWidth / 3,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }, {
            x: videoContainerWidth * 2 / 3,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }
        ];
      case 10:
        return [{
            x: 0,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 6
          },
          {
            x: 0,
            y: videoContainerHeight / 6,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 6
          },
          {
            x: videoContainerWidth / 3,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 2 * videoContainerWidth / 3,
            y: 0,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 0,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: videoContainerWidth / 3,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 2 * videoContainerWidth / 3,
            y: videoContainerHeight / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          },
          {
            x: 0,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }, {
            x: videoContainerWidth / 3,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }, {
            x: videoContainerWidth * 2 / 3,
            y: videoContainerHeight * 2 / 3,
            width: videoContainerWidth / 3,
            height: videoContainerHeight / 3
          }
        ];
    }
  }

}


module.exports = Layouter;