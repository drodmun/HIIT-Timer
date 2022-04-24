/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ISourceOptions } from "tsparticles-engine";

const options: ISourceOptions = {
  autoPlay: true,
  background: {
    color: {
      value: "#00FAFC"
    },
    image: "url('/static/assets/images/background.webp')",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
    opacity: 0.8
  },
  backgroundMask: {
    composite: "destination-out",
    cover: {
      color: {
        value: "#fff"
      },
      opacity: 1
    },
    enable: false
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      // @ts-ignore
      onDiv: {
        selectors: [],
        enable: false,
        mode: [],
        type: "circle"
      },
      onHover: {
        enable: true,
        mode: "grab",
        parallax: {
          enable: true,
          force: 80,
          smooth: 10
        }
      },
      resize: true
    },
    modes: {
      attract: {
        distance: 128,
        duration: 0.3,
        // @ts-ignore
        easing: "ease-out-quad",
        factor: 1,
        maxSpeed: 50,
        speed: 1
      },
      bounce: {
        distance: 200
      },
      bubble: {
        distance: 400,
        duration: 2,
        mix: false,
        opacity: 0.8,
        size: 40,
        divs: {
          distance: 200,
          duration: 0.4,
          mix: false,
          selectors: []
        }
      },
      connect: {
        distance: 80,
        links: {
          opacity: 0.5
        },
        radius: 60
      },
      grab: {
        distance: 256,
        links: {
          blink: true,
          consent: false,
          opacity: 0.6
        }
      },
      light: {
        area: {
          gradient: {
            start: {
              value: "#ffffff"
            },
            stop: {
              value: "#000000"
            }
          },
          radius: 1000
        },
        shadow: {
          color: {
            value: "#000000"
          },
          length: 2000
        }
      },
      push: {
        default: true,
        groups: [],
        quantity: 4
      },
      remove: {
        quantity: 2
      },
      repulse: {
        distance: 200,
        duration: 0.4,
        factor: 100,
        speed: 1,
        maxSpeed: 50,
        // @ts-ignore
        easing: "ease-out-quad",
        // @ts-ignore
        divs: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad",
          selectors: []
        }
      },
      slow: {
        factor: 3,
        radius: 200
      },
      trail: {
        delay: 1,
        pauseOnStop: false,
        quantity: 1
      }
    }
  },
  manualParticles: [],
  motion: {
    disable: false,
    reduce: {
      factor: 4,
      value: true
    }
  },
  particles: {
    bounce: {
      horizontal: {
        random: {
          enable: false,
          minimumValue: 0.1
        },
        value: 1
      },
      vertical: {
        random: {
          enable: false,
          minimumValue: 0.1
        },
        value: 1
      }
    },
    collisions: {
      bounce: {
        horizontal: {
          random: {
            enable: false,
            minimumValue: 0.1
          },
          value: 1
        },
        vertical: {
          random: {
            enable: false,
            minimumValue: 0.1
          },
          value: 1
        }
      },
      enable: false,
      mode: "bounce",
      overlap: {
        enable: true,
        retries: 0
      }
    },
    color: {
      value: "#ffffff",
      animation: {
        h: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 1,
          sync: true
        },
        s: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 1,
          sync: true
        },
        l: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 1,
          sync: true
        }
      }
    },
    destroy: {
      // @ts-ignore
      mode: "none",
      split: {
        count: 1,
        factor: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: 3
        },
        rate: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: {
            min: 4,
            max: 9
          }
        },
        sizeOffset: true
      }
    },
    gradient: [],
    groups: {},
    life: {
      count: 0,
      delay: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 0,
        sync: false
      },
      duration: {
        random: {
          enable: false,
          minimumValue: 0.0001
        },
        value: 0,
        sync: false
      }
    },
    links: {
      blink: false,
      color: {
        value: "#ffffff"
      },
      consent: false,
      distance: 150,
      enable: true,
      frequency: 1,
      opacity: 0.4,
      shadow: {
        blur: 5,
        color: {
          value: "#000"
        },
        enable: false
      },
      triangles: {
        enable: false,
        frequency: 1
      },
      width: 1,
      warp: false
    },
    move: {
      angle: {
        offset: 0,
        value: 90
      },
      attract: {
        distance: 256,
        enable: false,
        rotate: {
          x: 600,
          y: 1200
        }
      },
      center: {
        x: 50,
        y: 50,
        radius: 0
      },
      decay: 0,
      distance: {},
      direction: "none",
      drift: 0,
      enable: true,
      gravity: {
        acceleration: 9.81,
        enable: false,
        inverse: false,
        maxSpeed: 50
      },
      path: {
        clamp: true,
        delay: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: 0
        },
        enable: false,
        options: {}
      },
      outModes: {
        default: "out",
        bottom: "out",
        left: "out",
        right: "out",
        top: "out"
      },
      random: false,
      size: false,
      speed: 1,
      spin: {
        acceleration: 0,
        enable: false
      },
      straight: false,
      trail: {
        enable: false,
        length: 10,
        fillColor: {
          value: "#000000"
        }
      },
      vibrate: false,
      warp: false
    },
    number: {
      density: {
        enable: true,
        area: 800,
        factor: 1000
      },
      limit: 0,
      value: 128
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.1
      },
      value: {
        min: 0.1,
        max: 0.25
      },
      animation: {
        count: 0,
        enable: true,
        speed: 1,
        sync: false,
        destroy: "none",
        startValue: "random",
        minimumValue: 0.1
      }
    },
    orbit: {
      animation: {
        count: 0,
        enable: false,
        speed: 1,
        sync: false
      },
      enable: false,
      opacity: 1,
      rotation: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 45
      },
      width: 1
    },
    reduceDuplicates: false,
    repulse: {
      random: {
        enable: false,
        minimumValue: 0
      },
      value: 0,
      enabled: false,
      distance: 1,
      duration: 1,
      factor: 1,
      speed: 1
    },
    roll: {
      darken: {
        enable: false,
        value: 0
      },
      enable: false,
      enlighten: {
        enable: false,
        value: 0
      },
      mode: "vertical",
      speed: 25
    },
    rotate: {
      random: {
        enable: false,
        minimumValue: 0
      },
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        sync: false
      },
      direction: "clockwise",
      path: false
    },
    shadow: {
      blur: 0,
      color: {
        value: "#000"
      },
      enable: false,
      offset: {
        x: 0,
        y: 0
      }
    },
    shape: {
      options: {},
      type: "circle"
    },
    size: {
      random: {
        enable: true,
        minimumValue: 1
      },
      value: {
        min: 0.1,
        max: 3
      },
      animation: {
        count: 0,
        enable: true,
        speed: 20,
        sync: false,
        destroy: "none",
        startValue: "random",
        minimumValue: 0.1
      }
    },
    stroke: {
      width: 0
    },
    tilt: {
      random: {
        enable: false,
        minimumValue: 0
      },
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        sync: false
      },
      direction: "clockwise",
      enable: false
    },
    twinkle: {
      lines: {
        enable: false,
        frequency: 0.05,
        opacity: 1
      },
      particles: {
        enable: false,
        frequency: 0.05,
        opacity: 1
      }
    },
    wobble: {
      distance: 5,
      enable: false,
      speed: 50
    },
    zIndex: {
      random: {
        enable: false,
        minimumValue: 0
      },
      value: 0,
      opacityRate: 1,
      sizeRate: 1,
      velocityRate: 1
    }
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  responsive: [],
  style: {},
  themes: [],
  zLayers: 100
};

export default options;