(function() {
  var App;

  App = (function() {
    function App() {
      var cls;
      angular.element(document).ready((function(_this) {
        return function() {
          return _this.load();
        };
      })(this));
      THREE.warn = function() {};
      console.warn = function() {};
      cls = 'phase-' + env.PHASE;
      if (env.PHASE !== '1') {
        cls += ' phase-live';
      }
      $('body').addClass(cls);
      return ['ngAria', 'ngRoute', 'angularXml2json', 'ngUpload', 'facebook', 'ngLodash', 'ngAnimate', 'ngSanitize', 'twitterFilters'];
    }

    App.prototype.load = function() {
      var app;
      app = angular.module("app");
      return AssetLoader.load(Assets.all()).then((function(_this) {
        return function(data) {
          Assets.update(data);
          return _this.start();
        };
      })(this), function(error) {
        return console.log(error);
      });
    };

    App.prototype.start = function() {
      c.enable = true;
      return angular.bootstrap(document, ['app']);
    };

    return App;

  })();

  angular.module('app', new App());

}).call(this);

(function() {
  var ExploreFadeTo;

  ExploreFadeTo = (function() {
    function ExploreFadeTo($rootScope) {
      var duration;
      duration = 1;
      return {
        addClass: function(element, className, done) {
          var params;
          if (className === 'ng-hide') {
            TweenMax.killTweensOf(element);
            TweenMax.set(element, {
              opacity: 1
            });
            params = {
              opacity: 0,
              onComplete: done,
              ease: Power2.easeOut
            };
            return TweenMax.to(element, duration, params);
          } else {
            return done();
          }
        },
        removeClass: function(element, className, done) {
          var params;
          if (className === 'ng-hide') {
            TweenMax.killTweensOf(element);
            TweenMax.set(element, {
              opacity: 0,
              position: 'absolute'
            });
            params = {
              opacity: 1,
              delay: 2,
              onStart: (function(_this) {
                return function() {
                  return element.attr('style', '');
                };
              })(this),
              onComplete: done,
              ease: Power2.easeOut
            };
            return TweenMax.to(element, duration, params);
          } else {
            return done();
          }
        }
      };
    }

    return ExploreFadeTo;

  })();

  angular.module('app').animation('.explore-fade-to', ['$rootScope', ExploreFadeTo]);

}).call(this);

(function() {
  var FadeTo;

  FadeTo = (function() {
    function FadeTo($rootScope) {
      var duration;
      duration = 1;
      return {
        addClass: function(element, className, done) {
          var params;
          if (className === 'ng-hide') {
            TweenMax.killTweensOf(element);
            TweenMax.set(element, {
              opacity: 1
            });
            params = {
              opacity: 0,
              onComplete: done,
              ease: Power2.easeOut
            };
            return TweenMax.to(element, duration, params);
          } else {
            return done();
          }
        },
        removeClass: function(element, className, done) {
          var params;
          if (className === 'ng-hide') {
            TweenMax.killTweensOf(element);
            TweenMax.set(element, {
              opacity: 0,
              position: 'absolute'
            });
            params = {
              opacity: 1,
              delay: 1.1,
              onStart: (function(_this) {
                return function() {
                  return element.attr('style', '');
                };
              })(this),
              onComplete: done,
              ease: Power2.easeOut
            };
            return TweenMax.to(element, duration, params);
          } else {
            return done();
          }
        }
      };
    }

    return FadeTo;

  })();

  angular.module('app').animation('.fade-to', ['$rootScope', FadeTo]);

}).call(this);

(function() {
  var FacebookConfig;

  FacebookConfig = (function() {
    function FacebookConfig(FacebookProvider) {
      FacebookProvider.init(env.FACEBOOK_APP_ID);
    }

    return FacebookConfig;

  })();

  angular.module('app').config(['FacebookProvider', FacebookConfig]);

}).call(this);

(function() {
  var Explore;

  Explore = (function() {
    function Explore($scope, $rootScope, $location, Utils, Dictionary, Settings, Timeline, Win) {
      $scope.show = false;
      $scope.monumentReady = false;
      $scope.showWebgl = false;
      $scope.showFallback = false;
      $scope.userHasRegistered = false;
      $scope.showMonumentBackground = env.PHASE === '1' ? false : true;
      $scope.user = null;
      $scope.userLoggedIn = false;
      $scope.userNotDragging = true;
      $scope.showIntro = false;
      $scope.showUserPopup = false;
      $scope.playObjectTransition = false;
      $scope.showUserTooltip = false;
      $scope.showClaimTooltip = false;
      $scope.deeplinkedToSpot = false;
      $scope.registrationOpen = false;
      $scope.showShare = false;
      $scope.tooltipDirection = '';
      $scope.currentTooltipType = 'claim';
      $scope.tooltip = {
        x: 0,
        y: 0
      };
      $scope.isHovering = '';
      $scope.foundUser = {
        firstname: 'alexandre',
        lastname: 'francois',
        city: 'Von London',
        profilePicture: ''
      };
      $rootScope.$on('monument.ready', function() {
        return $scope.$apply((function(_this) {
          return function() {
            $scope.monumentReady = true;
            if (env.WEBGL) {
              return $scope.showWebgl = true;
            } else {
              return $scope.showFallback = true;
            }
          };
        })(this));
      });
    }

    return Explore;

  })();

  angular.module('app').controller('exploreController', ['$scope', '$rootScope', '$location', 'Utils', 'Dictionary', 'Settings', 'Timeline', 'Win', Explore]);

}).call(this);

(function() {
  var AssetLoader, GeometryLoader, ImageLoader, JSONLoader, XMLLoader;

  JSONLoader = new (JSONLoader = (function() {
    function JSONLoader() {
      var load;
      load = function(asset) {
        var promise;
        promise = new Promise(function(fullfill, reject) {
          var req;
          req = $.ajax(asset.url, {
            type: 'get'
          });
          req.success(function(response) {
            asset.data = response;
            return fullfill(asset);
          });
          return req.error(function(error) {
            return reject(error);
          });
        });
        return promise;
      };
      return {
        load: load
      };
    }

    return JSONLoader;

  })());

  XMLLoader = new (XMLLoader = (function() {
    function XMLLoader() {
      var load;
      load = function(asset) {
        var promise;
        promise = new Promise(function(fullfill, reject) {
          var req;
          req = $.ajax(asset.url, {
            type: 'get'
          });
          req.success(function(response) {
            asset.data = response;
            return fullfill(asset);
          });
          return req.error(function(error) {
            return reject(error);
          });
        });
        return promise;
      };
      return {
        load: load
      };
    }

    return XMLLoader;

  })());

  GeometryLoader = new (GeometryLoader = (function() {
    function GeometryLoader() {
      var load;
      load = function(asset) {
        var promise;
        promise = new Promise(function(fullfill, reject) {
          var loader;
          loader = new THREE.JSONLoader();
          return loader.load(asset.url, (function(_this) {
            return function(geometry) {
              if (geometry != null) {
                asset.data = geometry;
                return fullfill(asset);
              } else {
                return reject('failed to load geometry: ' + asset.id);
              }
            };
          })(this));
        });
        return promise;
      };
      return {
        load: load
      };
    }

    return GeometryLoader;

  })());

  ImageLoader = new (ImageLoader = (function() {
    function ImageLoader() {
      var load;
      load = function(asset) {
        var promise;
        promise = new Promise(function(fullfill, reject) {
          var image;
          image = new Image();
          image.onload = (function(_this) {
            return function() {
              asset.data = image;
              return fullfill(asset);
            };
          })(this);
          image.onerror = (function(_this) {
            return function(error) {
              return reject('Failed to load image: ' + asset.url);
            };
          })(this);
          return image.src = asset.url;
        });
        return promise;
      };
      return {
        load: load
      };
    }

    return ImageLoader;

  })());

  window.AssetLoader = new (AssetLoader = (function() {
    function AssetLoader() {
      var assets, load;
      assets = null;
      load = function(manifest) {
        var asset, date, i, len, loaders, promise, total;
        total = manifest.length;
        date = new Date();
        loaders = [];
        for (i = 0, len = manifest.length; i < len; i++) {
          asset = manifest[i];
          switch (asset.type) {
            case 'json':
              loaders.push(JSONLoader.load(asset));
              break;
            case 'xml':
              loaders.push(XMLLoader.load(asset));
              break;
            case 'image':
              loaders.push(ImageLoader.load(asset));
              break;
            case 'geometry':
              loaders.push(GeometryLoader.load(asset));
          }
        }
        promise = new Promise(function(fullfill, reject) {
          return Promise.all(loaders).then(function(response) {
            return fullfill(response);
          }, function(error) {
            return reject(error);
          });
        });
        return promise;
      };
      return {
        load: load
      };
    }

    return AssetLoader;

  })());

}).call(this);

(function() {
  var Assets;

  window.Assets = new (Assets = (function() {
    function Assets() {
      var addAssets, all, fallbackAssets, getAsset, mainAssets, update, webglAssets;
      mainAssets = [
        {
          id: 'Dictionary',
          url: '/xml/' + env.LOCALE + '/Dictionary.xml',
          type: 'xml'
        }
      ];
      webglAssets = function() {
        var assets, phase2;
        assets = [
          {
            id: 'MeshIndices',
            url: '/webgl-assets/data/MeshIndices.json',
            type: 'json'
          }, {
            id: 'PathIntro',
            url: '/webgl-assets/data/PathIntro.json',
            type: 'json'
          }, {
            id: 'PathTower',
            url: '/webgl-assets/data/PathTower.json',
            type: 'json'
          }, {
            id: 'Tower',
            url: '/webgl-assets/models/Tower2.js',
            type: 'geometry'
          }, {
            id: 'Bottle',
            url: '/webgl-assets/models/Bottle.js',
            type: 'geometry'
          }, {
            id: 'BottleHighPoly',
            url: '/webgl-assets/models/BottleHighPoly.js',
            type: 'geometry'
          }, {
            id: 'Particle',
            url: '/webgl-assets/textures/Particle.png',
            type: 'image'
          }, {
            id: 'FloorTexture',
            url: '/webgl-assets/textures/FloorTexture.jpg',
            type: 'image'
          }, {
            id: 'SkyTexture',
            url: '/webgl-assets/textures/SkyTexture.jpg',
            type: 'image'
          }, {
            id: 'FloorTextureBump',
            url: '/webgl-assets/textures/FloorTextureBump.jpg',
            type: 'image'
          }, {
            id: 'BottleTexture',
            url: '/webgl-assets/textures/BottleTexture.jpg',
            type: 'image'
          }, {
            id: 'ProfilePicture',
            url: '/webgl-assets/textures/ProfilePicture.jpg',
            type: 'image'
          }, {
            id: 'BottleAlphaMap',
            url: '/webgl-assets/textures/BottleAlphaMap.jpg',
            type: 'image'
          }, {
            id: 'ParticleAlphaMap',
            url: '/webgl-assets/textures/ParticleAlphaMap.jpg',
            type: 'image'
          }
        ];
        phase2 = [
          {
            id: 'Base',
            url: '/webgl-assets/models/Base.js',
            type: 'geometry'
          }, {
            id: 'Hat',
            url: '/webgl-assets/models/Hat.js',
            type: 'geometry'
          }, {
            id: 'BaseTexture',
            url: '/webgl-assets/textures/BaseTexture.jpg',
            type: 'image'
          }, {
            id: 'BaseTextureBump',
            url: '/webgl-assets/textures/BaseTextureBump.jpg',
            type: 'image'
          }, {
            id: 'HatTexture',
            url: '/webgl-assets/textures/HatTexture.jpg',
            type: 'image'
          }
        ];
        assets = assets.concat(phase2);
        return assets;
      };
      addAssets = function(_assets) {
        return mainAssets = mainAssets.concat(_assets);
      };
      fallbackAssets = function() {
        var assets;
        assets = [
          {
            id: 'Bottle',
            url: '/fallback-assets/textures/BottleMaterial.png',
            type: 'image'
          }, {
            id: 'Particle',
            url: '/fallback-assets/textures/ParticleMaterial.png',
            type: 'image'
          }, {
            id: 'BottleAlphaMap',
            url: '/fallback-assets/textures/BottleMaterialAlphaMask.png',
            type: 'image'
          }, {
            id: 'ParticleAlphaMap',
            url: '/fallback-assets/textures/ParticleMaterialAlphaMask.png',
            type: 'image'
          }
        ];
        return assets;
      };
      if (env.WEBGL) {
        addAssets(webglAssets());
      } else {
        addAssets(fallbackAssets());
      }
      all = function() {
        return mainAssets;
      };
      update = function(_assets) {
        return mainAssets = _assets;
      };
      getAsset = function(id) {
        return _.find(mainAssets, {
          id: id
        });
      };
      return {
        all: all,
        update: update,
        getAsset: getAsset
      };
    }

    return Assets;

  })());

}).call(this);

(function() {
  var Detect;

  Detect = (function() {
    function Detect() {
      var desktop, device, md, mobile, notMobile, tablet;
      md = new MobileDetect(window.navigator.userAgent);
      mobile = _.isString(md.mobile()) ? true : false;
      tablet = _.isString(md.tablet()) ? true : false;
      device = mobile || tablet;
      if (mobile === false && tablet === false) {
        desktop = true;
      } else {
        desktop = false;
      }
      if (tablet) {
        mobile = false;
      }
      notMobile = mobile === false;
      return {
        mobile: mobile,
        tablet: tablet,
        desktop: desktop,
        notMobile: notMobile,
        device: device,
        firefox: bowser.firefox,
        ie: bowser.msie,
        version: bowser.version
      };
    }

    return Detect;

  })();

  angular.module('app').factory('Detect', [Detect]);

}).call(this);

(function() {
  var Dictionary;

  Dictionary = (function() {
    function Dictionary() {
      var data, get;
      data = $(Assets.getAsset('Dictionary').data);
      get = function(key) {
        if (data.find(key).length) {
          return data.find(key).text();
        } else {
          return "Dictionary field doesn't exist.";
        }
      };
      return {
        get: get
      };
    }

    return Dictionary;

  })();

  angular.module('app').factory('Dictionary', [Dictionary]);

}).call(this);

(function() {
  var GUI;

  GUI = (function() {
    function GUI() {
      var Folder, GUIWrapper, debug, gui;
      debug = env.GUI;
      Folder = (function() {
        function Folder() {}

        Folder.prototype.add = function() {
          return this;
        };

        Folder.prototype.listen = function() {
          return this;
        };

        Folder.prototype.name = function() {
          return this;
        };

        Folder.prototype.open = function() {
          return this;
        };

        Folder.prototype.onChange = function() {
          return this;
        };

        Folder.prototype.addFolder = function() {
          return new Folder;
        };

        Folder.prototype.addColor = function() {
          return this;
        };

        return Folder;

      })();
      GUIWrapper = (function() {
        function GUIWrapper() {}

        GUIWrapper.prototype.add = function() {
          return this;
        };

        GUIWrapper.prototype.addFolder = function() {
          return new Folder;
        };

        GUIWrapper.prototype.name = function() {
          return this;
        };

        GUIWrapper.prototype.close = function() {
          return this;
        };

        GUIWrapper.prototype.step = function() {
          return this;
        };

        GUIWrapper.prototype.onChange = function() {
          return this;
        };

        GUIWrapper.prototype.setValue = function() {
          return this;
        };

        GUIWrapper.prototype.listen = function() {
          return this;
        };

        return GUIWrapper;

      })();
      if (debug) {
        gui = new dat.GUI({
          width: 350
        });
        gui.close();
      } else {
        gui = new GUIWrapper;
      }
      return gui;
    }

    return GUI;

  })();

  angular.module('app').factory('GUI', [GUI]);

}).call(this);

(function() {
  var RAF;

  RAF = (function() {
    var id_animloop, running;

    id_animloop = null;

    running = false;

    function RAF() {
      var animloop, event, start, stop;
      event = {};
      Happens(event);
      start = function() {
        if (running) {
          return;
        }
        running = true;
        return id_animloop = window.requestAnimationFrame(animloop);
      };
      stop = function() {
        window.cancelAnimationFrame(id_animloop);
        id_animloop = null;
        return running = false;
      };
      animloop = (function(_this) {
        return function() {
          id_animloop = window.requestAnimationFrame(animloop);
          return event.emit('tick');
        };
      })(this);
      return {
        event: event,
        start: start,
        stop: stop
      };
    }

    return RAF;

  })();

  angular.module('app').factory('RAF', [RAF]);

}).call(this);

(function() {
  var Responsive;

  Responsive = (function() {
    function Responsive($window, Win) {
      var mobileWidth, tabletWidth;
      mobileWidth = 768;
      tabletWidth = 1025;
      this.mobile = false;
      this.tablet = false;
      this.desktop = false;
      this.orientation = 'portrait';
      this.landscape = false;
      this.portrait = false;
      this.resize = (function(_this) {
        return function() {
          _this.mobile = false;
          _this.tablet = false;
          _this.desktop = false;
          if (Win.width < mobileWidth) {
            _this.mobile = true;
          } else if (Win.width < tabletWidth) {
            _this.tablet = true;
          } else {
            _this.desktop = true;
          }
          return {
            mobile: _this.mobile,
            tablet: _this.tablet,
            desktop: _this.desktop
          };
        };
      })(this);
      this.orientationchange = (function(_this) {
        return function() {
          var orientation;
          orientation = window.orientation || window.mozOrientation || window.msOrientation || 0;
          orientation = Math.abs(orientation);
          if (orientation === 90) {
            _this.orientation = 'landscape';
            _this.landscape = true;
            return _this.portrait = false;
          } else {
            _this.orientation = 'portrait';
            _this.portrait = true;
            return _this.landscape = false;
          }
        };
      })(this);
      Win.on('resize', this.resize);
      Win.on('orientationchange', this.orientationchange);
      this.resize();
      this.orientationchange();
      return this;
    }

    return Responsive;

  })();

  angular.module('app').factory('Responsive', ['$window', 'Win', Responsive]);

}).call(this);

(function() {
  var Timeline;

  Timeline = (function() {
    function Timeline(GUI, RAF) {
      var endTime, folder, startTime;
      this.percent = 0;
      this.startTime = '';
      this.endTime = '';
      this.nowTime = '';
      this.duration = 10;
      folder = GUI.addFolder('timeline');
      folder.open();
      startTime = moment(env.TIMELINE.START, 'YYYY-MM-DD HH:mm:ss');
      endTime = moment(env.TIMELINE.END, 'YYYY-MM-DD HH:mm:ss');
      folder.add(this, 'startTime').listen();
      folder.add(this, 'endTime').listen();
      folder.add(this, 'nowTime').listen();
      folder.add(this, 'percent', 0, 1).listen();
      this.startTime = startTime._d;
      this.endTime = endTime._d;
      this.startUpdate = function() {
        return RAF.start();
      };
      this.stopUpdate = function() {
        return RAF.stop();
      };
      this.playTransition = (function(_this) {
        return function() {
          var currentEndTime, currentStartTime, end, params, start;
          _this.stopUpdate();
          currentStartTime = _this.startTime;
          currentEndTime = _this.endTime;
          start = moment().seconds(0);
          end = moment(start).add(1, 'minute');
          startTime = start.format('YYYY-MM-DD HH:mm:ss');
          endTime = end.format('YYYY-MM-DD HH:mm:ss');
          _this.percent = 0;
          params = {
            percent: 1,
            ease: Linear.easeNone,
            onComplete: function() {
              startTime = currentStartTime;
              endTime = currentEndTime;
              return _this.startUpdate();
            }
          };
          return TweenLite.to(_this, _this.duration, params);
        };
      })(this);
      this.stopTransition = (function(_this) {
        return function() {};
      })(this);
      this.update = (function(_this) {
        return function() {
          var end, now, start;
          now = moment();
          _this.now = now.unix();
          start = startTime.unix();
          end = endTime.unix();
          _this.percent = (_this.now - start) / (end - start);
          _this.percent = THREE.Math.clamp(_this.percent, 0, 1);
          if (env.PHASE !== '1') {
            _this.percent = 1;
          }
          return _this.percent = 0;
        };
      })(this);
      folder.add(this, 'playTransition');
      folder.add(this, 'stopTransition');
      this.update();
      this.startUpdate();
      return this;
    }

    return Timeline;

  })();

  angular.module('app').factory('Timeline', ['GUI', 'RAF', Timeline]);

}).call(this);

(function() {
  var Win;

  Win = (function() {
    function Win($window) {
      var $$window, onResize;
      Happens(this);
      this.width = 0;
      this.height = 0;
      $$window = $($window);
      this.width = $$window.width();
      this.height = $$window.height();
      onResize = (function(_this) {
        return function(event) {
          _this.width = $$window.width();
          _this.height = $$window.height();
          return _this.emit('resize');
        };
      })(this);
      $$window.on('resize', onResize);
      onResize();
      return this;
    }

    return Win;

  })();

  angular.module('app').factory('Win', ['$window', Win]);

}).call(this);

(function() {
  var MonumentWebgl;

  MonumentWebgl = (function() {
    function MonumentWebgl($window, $rootScope, $location, GUI, TwistModifier, lodash, ObjectLayout, Materials, Lights, Fog, Timeline, ObjectZoomHelper, Cameras, Scene, IntroPath, TowerPath, Win, Detect, Settings, Utils) {
      return {
        restrict: 'A',
        scope: {
          enabled: '=enabled',
          userloggedin: '=userloggedin'
        },
        link: function($scope1, $element) {
          var $obeliskuserDragArea, $registerFormDragArea, LIGHT_END_Y, LIGHT_START_Y, angleRange, animateObjectIn, animateObjectOut, baseMesh, bottle, bottleZoomMesh, bottles, bottlesMeshes, cameraPathBaseSize, cameraPathEnd, cameraPathStart, cameraPathTotalPoints, composer, controls, createBase, createBottles, createDome, createGround, createHat, createObjectRotationHelpher, createParticles, createTower, createZoomBottle, createZoomParticle, currentObjectData, curveIndices, deeplinkFirstTime, delta, dirtPass, domeMesh, dragIO, endObj, exploreDeeplink, fovZoom, getAsset, getTowerPathPoints, groundMesh, hasIntersected, hatMesh, helperAxis, helperGrid, helpers, hidefoundUser, i, indices, initialSetup, initialTween, intersectObjects, intersectableMeshes, isFoundUserShown, j, k, l, len, len1, len2, len3, len4, len5, light, modifier, moveLight, n, noisePass, o, object, objectCycleInTransition, objectCycleOutTransition, objectDrag, objectOrder, objectRotationHelper, onMouseDown, onMouseUp, onObjectDrag, onObjectRelease, p, particleMesh, particleZoomMesh, pathTowerPoints, point, raycaster, raycasterMouse, ref, ref1, registrationFormOpenTransition, registrationNextTransition, registrationPrevTransition, render, renderScene, renderer, reset, resize, rotationAxis, set, shapeFolder, showfoundUser, startObj, tmp, tmpVector, totalBottles, towerMesh, transitionInComplete, twist, update, updateZoomTextures, vertex, zoom, zoomBlurPass;
          this.$scope = $scope1;
          this.$element = $element;
          if (env.WEBGL === false) {
            return;
          }
          hasIntersected = false;
          currentObjectData = null;
          deeplinkFirstTime = true;
          initialTween = null;
          transitionInComplete = false;
          $registerFormDragArea = $('.register-form .left');
          $obeliskuserDragArea = $('.obelisk-user');
          objectDrag = new ObjectDragIOWebgl($('.register-form .left, .obelisk-user'), Detect.device, Win);
          dragIO = new DragIOWebgl(this.$element, Detect.device);
          Cameras.user.position.set(0, 0, 50);
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: this.$element[0]
          });
          renderer.shadowMapEnabled = true;
          renderer.shadowMapType = THREE.PCFSoftShadowMap;
          renderer.setSize($window.innerWidth, $window.innerHeight);
          Scene.fog = Fog.fog;
          ref = Lights.all;
          for (j = 0, len = ref.length; j < len; j++) {
            light = ref[j];
            Scene.add(light);
          }
          helperGrid = new THREE.GridHelper(50, 10);
          helperAxis = new THREE.AxisHelper(1000);
          controls = new THREE.OrbitControls(Cameras.dev, this.$element[0]);
          helpers = [controls];
          getAsset = function(id) {
            return lodash.find(Assets.all(), {
              id: id
            });
          };
          if (Settings.postProcessing) {
            WAGNER.fragmentShadersPath = './js/fragment-shaders';
            WAGNER.assetsPath = './js/assets';
            composer = new WAGNER.Composer(renderer, {
              useRGBA: true
            });
            dirtPass = new WAGNER.DirtPass();
            noisePass = new WAGNER.NoisePass();
            noisePass.params.amount = .065;
            noisePass.params.speed = 10;
            zoomBlurPass = new WAGNER.ZoomBlurPass();
            zoomBlurPass.params.strength = .005;
            composer.setSize(Win.width, Win.height);
            zoomBlurPass.params.center.set(.5 * composer.width, .5 * composer.height);
          }
          createDome = function() {
            var geometry, material, mesh;
            material = Materials.DomeMaterial.material;
            geometry = new THREE.SphereGeometry(6000, 60, 40);
            mesh = new THREE.Mesh(geometry, material);
            mesh.receiveShadow = false;
            mesh.scale.set(-1, 1, 1);
            return mesh;
          };
          createGround = function() {
            var geometry, material, mesh, scale;
            material = Materials.GroundMaterial.material;
            geometry = new THREE.PlaneBufferGeometry(1000, 1000);
            mesh = new THREE.Mesh(geometry, material);
            mesh.receiveShadow = true;
            mesh.rotation.x = -Math.PI / 2;
            if (env.PHASE === '1') {
              mesh.position.set(0, 230, 0);
            } else {
              scale = 3.5;
              mesh.scale.set(scale, scale, scale);
            }
            return mesh;
          };
          createBase = function() {
            var geometry, material, mesh;
            material = Materials.BaseMaterial.material;
            geometry = getAsset('Base').data;
            mesh = new THREE.Mesh(geometry, material);
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            return mesh;
          };
          createTower = function() {
            var geometry, material, mesh, params;
            params = {
              color: 0xFFFFFF,
              wireframe: true
            };
            geometry = getAsset('Tower').data;
            material = new THREE.MeshLambertMaterial(params);
            mesh = new THREE.Mesh(geometry, material);
            mesh.visible = false;
            return mesh;
          };
          createHat = function() {
            var geometry, material, mesh;
            material = Materials.HatMaterial.material;
            geometry = getAsset('Hat').data;
            mesh = new THREE.Mesh(geometry, material);
            return mesh;
          };
          createBottles = function() {
            var geometry, i, k, material, mesh, meshes, object3d, ref1, scale;
            material = Materials.BottleMaterial.material;
            meshes = [];
            scale = 0.42;
            geometry = getAsset('Bottle').data;
            geometry.mergeVertices();
            geometry.computeVertexNormals();
            for (i = k = 0, ref1 = ObjectLayout.getTotalBottles(); 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
              mesh = new THREE.Mesh(geometry, material);
              object3d = new THREE.Object3D;
              mesh.scale.set(scale, scale, scale);
              mesh.castShadow = true;
              mesh.name = "" + i;
              mesh._d = mesh.position.clone();
              mesh.phaseY = Math.random() * 10;
              mesh.phaseZ = Math.random() * 10;
              object3d.add(mesh);
              meshes.push(object3d);
            }
            return meshes;
          };
          createParticles = function() {
            var ParticleMaterial, geometry, i, k, mesh, ref1;
            ParticleMaterial = Materials.ParticleMaterial;
            geometry = new THREE.Geometry();
            for (i = k = 0, ref1 = ObjectLayout.getTotalParticles(); 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
              geometry.vertices.push(new THREE.Vector3());
            }
            mesh = new THREE.PointCloud(geometry, ParticleMaterial.material);
            mesh.sortParticles = true;
            return mesh;
          };
          createZoomBottle = function() {
            var container, geometry, mesh, planeMesh, positionRange, rotationContainer, scale;
            geometry = getAsset('BottleHighPoly').data;
            geometry.mergeVertices();
            geometry.computeVertexNormals();
            scale = 0.42;
            container = new THREE.Object3D();
            rotationContainer = new THREE.Object3D();
            mesh = new THREE.Mesh(geometry, Materials.BottleZoomMaterial.bottleMaterial);
            mesh.scale.set(scale, scale, scale);
            mesh.castShadow = true;
            geometry = new THREE.PlaneBufferGeometry(38, 38, 1, 1);
            planeMesh = new THREE.Mesh(geometry, Materials.BottleZoomMaterial.photoMaterial);
            planeMesh.position.set(0, -1.5, 6.4);
            positionRange = Math.PI;
            GUI.add(rotationContainer.rotation, 'x', -positionRange, positionRange).name('rotation x');
            GUI.add(rotationContainer.rotation, 'y', -positionRange, positionRange).name('rotation y');
            GUI.add(rotationContainer.rotation, 'z', -positionRange, positionRange).name('rotation z');
            rotationContainer.add(planeMesh);
            rotationContainer.add(mesh);
            container.add(rotationContainer);
            container.visible = false;
            return container;
          };
          createZoomParticle = function() {
            var ParticleZoomMaterial, container, geometry, mesh, planeMesh, positionRange, rotationContainer, size;
            size = 50;
            container = new THREE.Object3D();
            rotationContainer = new THREE.Object3D();
            ParticleZoomMaterial = Materials.ParticleZoomMaterial;
            geometry = new THREE.PlaneBufferGeometry(size, size);
            mesh = new THREE.Mesh(geometry, ParticleZoomMaterial.particleMaterial);
            geometry = new THREE.PlaneBufferGeometry(31, 31, 1, 1);
            planeMesh = new THREE.Mesh(geometry, ParticleZoomMaterial.photoMaterial);
            planeMesh.position.set(0, 0, 0.1);
            positionRange = 50;
            GUI.add(planeMesh.position, 'x', -positionRange, positionRange).name('position x');
            GUI.add(planeMesh.position, 'y', -positionRange, positionRange).name('position y');
            GUI.add(planeMesh.position, 'z', -positionRange, positionRange).name('position z');
            rotationContainer.add(planeMesh);
            rotationContainer.add(mesh);
            container.add(rotationContainer);
            container.visible = false;
            return container;
          };
          point = function(v) {
            var geometry, m;
            geometry = new THREE.SphereGeometry(5, 8, 8);
            m = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
              color: 0xFF0000,
              wireframe: true
            }));
            m.position.copy(v);
            return Scene.add(m);
          };
          createObjectRotationHelpher = function() {
            var mesh;
            mesh = new THREE.Mesh(new THREE.SphereGeometry(50, 4, 4), new THREE.MeshBasicMaterial(0x00FF00));
            mesh.visible = false;
            return mesh;
          };
          raycaster = new THREE.Raycaster();
          raycaster.params.PointCloud.threshold = 6;
          raycasterMouse = new THREE.Vector2();

          /*
          				Create meshes
           */
          domeMesh = createDome();
          groundMesh = createGround();
          towerMesh = createTower();
          bottles = createBottles();
          bottleZoomMesh = createZoomBottle();
          particleMesh = createParticles();
          particleZoomMesh = createZoomParticle();
          objectRotationHelper = createObjectRotationHelpher();
          Scene.add(domeMesh);
          Scene.add(groundMesh);
          Scene.add(towerMesh);
          Scene.add(particleMesh);
          Scene.add(particleZoomMesh);
          Scene.add(bottleZoomMesh);
          Scene.add(objectRotationHelper);
          bottlesMeshes = [];
          for (k = 0, len1 = bottles.length; k < len1; k++) {
            object = bottles[k];
            bottlesMeshes.push(object.children[0]);
          }
          intersectableMeshes = [particleMesh].concat(bottlesMeshes);
          if (env.PHASE !== '1') {
            baseMesh = createBase();
            hatMesh = createHat();
            Scene.add(baseMesh);
            Scene.add(hatMesh);
          }
          for (l = 0, len2 = bottles.length; l < len2; l++) {
            bottle = bottles[l];
            Scene.add(bottle);
          }
          indices = getAsset('MeshIndices').data.indices;
          curveIndices = [];
          for (n = 0, len3 = indices.length; n < len3; n++) {
            set = indices[n];
            curveIndices.push(set[0]);
          }
          tmp = [];
          for (o = 0, len4 = indices.length; o < len4; o++) {
            set = indices[o];
            tmp = tmp.concat(set);
          }
          indices = tmp;
          ref1 = towerMesh.geometry.vertices;
          for (i = p = 0, len5 = ref1.length; p < len5; i = ++p) {
            vertex = ref1[i];
            towerMesh.geometry.vertices[i]._d = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
          }
          objectOrder = ObjectLayout.getOrder();
          modifier = {};
          pathTowerPoints = getAsset('PathTower').data;
          startObj = pathTowerPoints.camera[0];
          endObj = pathTowerPoints.camera[pathTowerPoints.camera.length - 1];
          rotationAxis = new THREE.Vector3(0, 1, 0);
          cameraPathStart = new THREE.Vector3(startObj.x, startObj.y, startObj.z);
          cameraPathEnd = new THREE.Vector3(endObj.x, endObj.y, endObj.z);
          cameraPathTotalPoints = 25;
          if (env.PHASE1) {
            cameraPathBaseSize = 400;
          } else {
            cameraPathBaseSize = 600;
          }
          getTowerPathPoints = function() {
            var alpha, index, points, q, ref2;
            points = [];
            for (index = q = 0, ref2 = cameraPathTotalPoints; 0 <= ref2 ? q < ref2 : q > ref2; index = 0 <= ref2 ? ++q : --q) {
              alpha = index / cameraPathTotalPoints;
              vertex = cameraPathStart.clone().lerp(cameraPathEnd, alpha);
              vertex.z = cameraPathBaseSize + (alpha * (1600 * (1 - modifier.progress)));
              vertex.applyAxisAngle(rotationAxis, Cameras.rotationAngle);
              point = {
                x: vertex.x,
                y: vertex.y,
                z: vertex.z
              };
              points.push(point);
            }
            return points;
          };
          IntroPath.setup(getAsset('PathIntro').data);
          TowerPath.setup(getAsset('PathTower').data, getTowerPathPoints());
          reset = function() {
            return modifier = {
              angle: 0.1,
              taper: 0.1,
              taperScale: 0.1,
              progress: 0.1
            };
          };
          reset();
          twist = (function(_this) {
            return function() {
              var ab, bottleIndex, cb, centerX, centerY, centerZ, face, gradient, index, indicesLength, indicesStart, len6, len7, logic, lookat, numVertices, particleIndex, points, position, q, quadIndex, r, ref2, type, vA, vB, vC;
              TwistModifier.angle(modifier.angle);
              numVertices = towerMesh.geometry.vertices.length;
              indicesLength = indices.length;
              indicesStart = Math.floor(THREE.Math.mapLinear(modifier.progress, 0, 1, 0, indicesLength));
              for (i = q = 0, len6 = indices.length; q < len6; i = ++q) {
                index = indices[i];
                gradient = (i - indicesStart) / indicesLength;
                gradient = THREE.Math.clamp(gradient, 0, 1);
                vertex = towerMesh.geometry.vertices[index];
                vertex.set(vertex._d.x, vertex._d.y, vertex._d.z);
                position = TwistModifier.twistAndTaper(vertex, i, modifier.taper, modifier.taperScale, gradient);
              }
              towerMesh.geometry.verticesNeedUpdate = true;
              quadIndex = 0;
              bottleIndex = 0;
              particleIndex = 0;
              lookat = new THREE.Vector3();
              cb = new THREE.Vector3();
              ab = new THREE.Vector3();
              ref2 = towerMesh.geometry.faces;
              for (i = r = 0, len7 = ref2.length; r < len7; i = ++r) {
                face = ref2[i];
                if (i < 600 || i >= 1200) {
                  logic = i % 2 === 0;
                } else {
                  logic = i % 2 !== 0;
                }
                if (logic) {
                  vA = towerMesh.geometry.vertices[face.a];
                  vB = towerMesh.geometry.vertices[face.b];
                  vC = towerMesh.geometry.vertices[face.c];
                  centerX = (vA.x + vB.x + vC.x) / 3;
                  centerY = (vA.y + vB.y + vC.y) / 3;
                  centerZ = (vA.z + vB.z + vC.z) / 3;
                  cb.subVectors(vC, vB);
                  ab.subVectors(vA, vB);
                  cb.cross(ab);
                  cb.normalize();
                  lookat.x = centerX + (50 * cb.x);
                  lookat.y = centerY + (50 * cb.y);
                  lookat.z = centerZ + (50 * cb.z);
                  type = objectOrder[quadIndex];
                  if (type === 'bottle') {
                    bottle = bottles[bottleIndex];
                    bottle.position.set(centerX, centerY, centerZ);
                    bottle.lookAt(lookat);
                    bottleIndex++;
                  } else {
                    particleMesh.geometry.vertices[particleIndex].set(centerX, centerY, centerZ);
                    particleIndex++;
                  }
                  quadIndex++;
                }
                particleMesh.geometry.verticesNeedUpdate = true;
              }

              /*
              					Update camera curve points
               */
              points = getTowerPathPoints();
              return TowerPath.updatePoints(points);
            };
          })(this);
          this.animateIn = function(duration, isDeeplink) {
            var params, points;
            if (duration == null) {
              duration = 5;
            }
            if (isDeeplink == null) {
              isDeeplink = false;
            }
            initialTween.totalProgress(1).kill();
            deeplinkFirstTime = false;
            $rootScope.$emit('on.transition.in');
            points = getAsset('PathIntro').data.camera;
            points.pop();
            points.push(TowerPath.getPointOnCameraPath(0));
            IntroPath.updatePoints(points);
            Cameras.positionY = 0;
            params = {
              positionY: 1,
              onUpdate: (function(_this) {
                return function() {
                  IntroPath.updateCameraPosition(Cameras.positionY);
                  return moveLight(1 - Cameras.positionY);
                };
              })(this),
              onComplete: (function(_this) {
                return function() {
                  transitionInComplete = true;
                  if (isDeeplink) {
                    return exploreDeeplink();
                  }
                };
              })(this)
            };
            return TweenMax.to(Cameras, duration, params);
          };
          this.animateInToUserObject = function(register) {
            var duration, objectIndex, params, position, rotationY, user;
            if (register == null) {
              register = true;
            }
            $rootScope.$emit('on.transition.in');
            transitionInComplete = false;
            user = userService.get();
            objectIndex = parseInt(user.occurance);
            switch (user.assetType) {
              case 'bottle':
                position = bottles[objectIndex].position;
                break;
              case 'particle':
                position = particleMesh.geometry.vertices[objectIndex];
            }
            rotationY = position.y;
            rotationY = rotationY.map(cameraPathStart.y, cameraPathEnd.y, 0, 1);
            rotationY = THREE.Math.clamp(rotationY, 0, 1);
            if (deeplinkFirstTime) {
              Cameras.positionY = 0;
              TowerPath.updateCameraPosition(0);
            }
            params = {
              positionY: rotationY,
              delay: 1,
              onUpdate: (function(_this) {
                return function() {
                  var points;
                  Cameras.rotationAngle = dragIO.rotation.x;
                  points = getTowerPathPoints();
                  TowerPath.updatePoints(points);
                  TowerPath.updateCameraPosition(Cameras.positionY);
                  return moveLight(Cameras.positionY);
                };
              })(this),
              onComplete: (function(_this) {
                return function() {
                  dragIO.rotation.y = Cameras.positionY;
                  transitionInComplete = true;
                  return exploreDeeplink(register);
                };
              })(this)
            };
            duration = 0.5 + (5 * rotationY);
            TweenMax.to(Cameras, duration, params);
            return deeplinkFirstTime = false;
          };
          shapeFolder = GUI.addFolder('shape');
          angleRange = 10;
          shapeFolder.add(modifier, 'angle', -angleRange, angleRange).onChange(twist);
          shapeFolder.add(modifier, 'taper', 0, 0.2).onChange(twist);
          shapeFolder.add(modifier, 'taperScale', 0, 2).onChange(twist);
          shapeFolder.add(modifier, 'progress', 0, 1).onChange(twist);
          shapeFolder.add(this, 'animateIn');
          zoom = function(camera, zoom) {
            camera.position.set(1 * zoom, 0.75 * zoom, 1 * zoom);
            return camera.lookAt(new THREE.Vector3);
          };
          fovZoom = function(zoomIn) {
            var fov, params;
            if (zoomIn == null) {
              zoomIn = false;
            }
            fov = zoomIn ? 60 : 65;
            params = {
              fov: fov,
              ease: Quad.easeOut,
              onUpdate: (function(_this) {
                return function() {
                  return Cameras.user.updateProjectionMatrix();
                };
              })(this)
            };
            return TweenMax.to(Cameras.user, 0.8, params);
          };
          animateObjectIn = function(data, register) {
            var params, scale, screenPosition, screenPositionData, screenPositionLookat, screenPositionTransition;
            if (register == null) {
              register = true;
            }
            if (transitionInComplete) {
              Fog.fadeIn();
            }
            fovZoom(true);
            if (register) {
              objectDrag.setActiveElement($registerFormDragArea, register);
            } else {
              objectDrag.setActiveElement($obeliskuserDragArea, register);
            }
            objectDrag.enable();
            ObjectZoomHelper.update(Cameras.user);
            screenPositionData = ObjectZoomHelper.getScreenPositionData();
            screenPosition = screenPositionData.position;
            screenPositionLookat = screenPositionData.lookat;
            screenPositionTransition = screenPositionData.transition;
            if (data.objectType === 'particle') {
              Materials.ParticleMaterial.hideParticle(data.intersectionIndex);
              scale = 0.27;
              objectRotationHelper.position.copy(screenPosition);
              objectRotationHelper.lookAt(screenPositionLookat);
              particleZoomMesh.visible = true;
              bottleZoomMesh.visible = false;
              Materials.ParticleZoomMaterial.resetOpacity();
              particleZoomMesh.lookAt(objectRotationHelper);
              if (data.animateFromPosition) {
                particleZoomMesh.scale.set(scale, scale, scale);
                particleZoomMesh.position.copy(data.intersectionPoint);
                particleZoomMesh.lookAt(Cameras.user.position);
                params = {
                  x: screenPosition.x,
                  y: screenPosition.y,
                  z: screenPosition.z,
                  onUpdate: (function(_this) {
                    return function() {
                      return particleZoomMesh.lookAt(screenPositionLookat);
                    };
                  })(this)
                };
                TweenMax.to(particleZoomMesh.position, 1, params);
                params = {
                  x: 1,
                  y: 1,
                  z: 1
                };
                TweenMax.to(particleZoomMesh.scale, 1, params);
              } else {
                particleZoomMesh.position.copy(screenPosition);
                particleZoomMesh.lookAt(screenPositionLookat);
                particleZoomMesh.scale.set(1, 1, 1);
                particleZoomMesh.position.copy(screenPositionTransition);
                params = {
                  x: screenPosition.x,
                  y: screenPosition.y,
                  z: screenPosition.z
                };
                TweenMax.to(particleZoomMesh.position, 1, params);
              }
              bottleZoomMesh.position.copy(screenPosition);
              bottleZoomMesh.lookAt(screenPositionLookat);
            } else {
              data.object.visible = false;
              bottleZoomMesh.position.copy(data.object.parent.position);
              bottleZoomMesh.rotation.copy(data.object.parent.rotation);
              objectRotationHelper.position.copy(screenPosition);
              objectRotationHelper.lookAt(screenPositionLookat);
              particleZoomMesh.visible = false;
              bottleZoomMesh.visible = true;
              Materials.BottleZoomMaterial.fadeIn();
              if (data.animateFromPosition) {
                if (bottleZoomMesh.rotation.y < Math.PI) {
                  bottleZoomMesh.rotation.y += Math.PI;
                }
                params = {
                  x: screenPosition.x,
                  y: screenPosition.y,
                  z: screenPosition.z,
                  onUpdate: (function(_this) {
                    return function() {
                      return bottleZoomMesh.lookAt(screenPositionLookat);
                    };
                  })(this)
                };
                TweenMax.to(bottleZoomMesh.position, 1, params);
                params = {
                  y: objectRotationHelper.rotation.y
                };
                TweenMax.to(bottleZoomMesh.rotation, 1, params);
              } else {
                bottleZoomMesh.position.copy(screenPositionTransition);
                bottleZoomMesh.lookAt(screenPositionLookat);
                params = {
                  x: screenPosition.x,
                  y: screenPosition.y,
                  z: screenPosition.z
                };
                TweenMax.to(bottleZoomMesh.position, 1, params);
              }
              particleZoomMesh.position.copy(screenPosition);
              particleZoomMesh.lookAt(screenPositionLookat);
            }
            return dragIO.disable();
          };
          animateObjectOut = function() {
            var container, params, screenPosition, screenPositionData, screenPositionLookat, screenPositionTransition;
            if (currentObjectData == null) {
              return;
            }
            fovZoom(false);
            objectDrag.disable();
            screenPositionData = ObjectZoomHelper.getScreenPositionData();
            screenPosition = screenPositionData.position;
            screenPositionLookat = screenPositionData.lookat;
            screenPositionTransition = screenPositionData.transition;
            if (currentObjectData.objectType === 'particle') {
              params = {
                x: screenPositionTransition.x,
                y: screenPositionTransition.y,
                z: screenPositionTransition.z
              };
              TweenMax.to(particleZoomMesh.position, 1, params);
            } else {
              params = {
                x: screenPositionTransition.x,
                y: screenPositionTransition.y,
                z: screenPositionTransition.z
              };
              TweenMax.to(bottleZoomMesh.position, 1, params);
              currentObjectData.object.visible = true;
            }
            container = bottleZoomMesh.children[0];
            TweenMax.killTweensOf(container);
            TweenMax.to(container.rotation, 0.6, {
              x: 0,
              y: 0,
              z: 0
            });
            container = particleZoomMesh.children[0];
            TweenMax.killTweensOf(container);
            TweenMax.to(container.rotation, 0.6, {
              x: 0,
              y: 0,
              z: 0
            });
            Materials.ParticleZoomMaterial.fadeOut();
            Materials.BottleZoomMaterial.fadeOut();
            if (angular.equals(Utils.getUriSegment(1), 'explore')) {
              return dragIO.enable();
            }
          };
          isFoundUserShown = false;
          showfoundUser = function(_currentObjectData) {
            var data, screenPosition;
            currentObjectData = _currentObjectData;
            isFoundUserShown = true;
            screenPosition = Utils.toScreenPosition(currentObjectData.intersectionPoint.clone(), Cameras.user);
            data = {
              user: currentObjectData.index,
              position: screenPosition,
              objectType: currentObjectData.objectType,
              occurance: currentObjectData.occurance
            };
            return this.$scope.$emit('monument.showTooltip', data);
          };
          registrationFormOpenTransition = function() {

            /*
            					If a user hasn't chosen a particle or bottle to claim
            					pick a random one
             */
            var assetType, index;
            if (currentObjectData == null) {
              index = obeliskUsersService.getRandomDataForRegistration().occurance;
              assetType = obeliskUsersService.getRandomDataForRegistration().assetType;
              switch (assetType) {
                case 'particle':
                  currentObjectData = {
                    point: particleMesh.geometry.vertices[index],
                    objectType: assetType,
                    objectIndex: index,
                    animateFromPosition: false
                  };
                  break;
                case 'bottle':
                  currentObjectData = {
                    object: bottles[index].children[0],
                    objectType: assetType,
                    objectIndex: index,
                    animateFromPosition: false
                  };
              }
            }
            return animateObjectIn(currentObjectData);
          };
          registrationNextTransition = function() {
            return animateObjectOut();
          };
          registrationPrevTransition = function() {
            return animateObjectIn(currentObjectData);
          };
          updateZoomTextures = function(image, delay) {
            if (delay == null) {
              delay = 0.5;
            }
            Materials.BottleZoomMaterial.updatePhotoTexture(image, delay);
            return Materials.ParticleZoomMaterial.updatePhotoTexture(image, delay);
          };
          hidefoundUser = function() {
            isFoundUserShown = false;
            return this.$scope.$emit('monument.hideTooltip');
          };
          intersectObjects = (function(_this) {
            return function() {
              var bottleIndex, data, index, intersection, intersections, len6, len7, objectIndex, objectType, occurance, order, particleIndex, q, r;
              if (!dragIO.enabled) {
                return;
              }
              raycasterMouse.x = dragIO.normalX;
              raycasterMouse.y = dragIO.normalY;
              raycaster.setFromCamera(raycasterMouse, Cameras.user);
              intersections = raycaster.intersectObjects(intersectableMeshes);
              intersection = intersections.length > 0 ? intersections[0] : null;
              if (intersection != null) {
                order = ObjectLayout.getOrder();
                if (intersection.face != null) {
                  objectType = 'bottle';
                  bottleIndex = parseInt(intersection.object.name);
                  index = 0;
                  occurance = 0;
                  for (i = q = 0, len6 = order.length; q < len6; i = ++q) {
                    object = order[i];
                    if (object === objectType) {
                      if (bottleIndex === occurance) {
                        break;
                      }
                      occurance++;
                    }
                    index++;
                  }
                  objectIndex = index;
                } else {
                  objectType = 'particle';
                  particleIndex = intersection.index;
                  index = 0;
                  occurance = 0;
                  for (i = r = 0, len7 = order.length; r < len7; i = ++r) {
                    object = order[i];
                    if (object === objectType) {
                      if (particleIndex === occurance) {
                        break;
                      }
                      occurance++;
                    }
                    index++;
                  }
                  objectIndex = index;
                }
              }
              if (intersection) {
                hasIntersected = true;
                data = {
                  point: towerMesh.geometry.vertices[objectIndex].clone(),
                  index: objectIndex,
                  objectType: objectType,
                  object: intersection.object,
                  animateFromPosition: true,
                  intersectionPoint: intersection.point.clone(),
                  intersectionIndex: intersection.index,
                  occurance: occurance
                };
                return showfoundUser(data);
              } else {
                hasIntersected = false;
                return hidefoundUser();
              }
            };
          })(this);
          onMouseDown = (function(_this) {
            return function() {
              return $rootScope.$emit('mouse.down');
            };
          })(this);
          onMouseUp = (function(_this) {
            return function() {
              return $rootScope.$emit('mouse.up');
            };
          })(this);
          onObjectDrag = (function(_this) {
            return function(position) {
              var containerBottle, containerParticle, params, posX, posY, rotate, rotateX, rotateY, rotationX, rotationY, rotationZ;
              posX = position.x;
              posY = position.y;
              containerParticle = particleZoomMesh.children[0].children[1];
              rotate = Math.PI / 8;
              TweenMax.killTweensOf(containerParticle);
              rotationZ = posX.map(0, 1, -rotate, rotate);
              params = {
                z: rotationZ
              };
              TweenMax.to(containerParticle.rotation, 0.9, params);
              posX = position.x;
              posY = position.y;
              containerBottle = bottleZoomMesh.children[0];
              rotateX = Math.PI / 8;
              rotateY = Math.PI / 6;
              TweenMax.killTweensOf(containerBottle);
              rotationX = posY.map(0, 1, -rotateX, rotateX);
              rotationY = posX.map(0, 1, -rotateY, rotateY);
              params = {
                x: rotationX,
                y: rotationY
              };
              return TweenMax.to(containerBottle.rotation, 0.6, params);
            };
          })(this);
          onObjectRelease = function() {
            var containerBottle, containerParticle, params;
            containerParticle = particleZoomMesh.children[0].children[1];
            TweenMax.killTweensOf(containerParticle);
            params = {
              z: 0
            };
            TweenMax.to(containerParticle.rotation, 0.6, params);
            containerBottle = bottleZoomMesh.children[0];
            TweenMax.killTweensOf(containerBottle);
            params = {
              x: 0,
              y: 0
            };
            return TweenMax.to(containerBottle.rotation, 0.6, params);
          };
          exploreDeeplink = function(register) {
            var index, userData;
            userData = userService.get();
            if (userData) {
              switch (userData.assetType) {
                case 'bottle':
                  index = parseInt(userData.occurance);
                  currentObjectData = {
                    object: bottles[index].children[0],
                    objectType: 'bottle',
                    objectIndex: index,
                    animateFromPosition: true
                  };
                  break;
                case 'particle':
                  index = parseInt(userData.occurance);
                  currentObjectData = {
                    point: particleMesh.geometry.vertices[index],
                    objectType: 'particle',
                    objectIndex: index,
                    animateFromPosition: true,
                    intersectionPoint: particleMesh.geometry.vertices[index]
                  };
              }
              updateZoomTextures(userService.get().profilePicture);
              return animateObjectIn(currentObjectData, register);
            }
          };
          LIGHT_START_Y = 250;
          LIGHT_END_Y = 1000;
          moveLight = function(percent) {
            return Lights.point.position.y = Utils.lerp(LIGHT_START_Y, LIGHT_END_Y, percent);
          };
          totalBottles = bottles.length;
          tmpVector = new THREE.Vector3();
          delta = 0;
          update = function() {
            var child, d, helper, len6, phaseY, phaseZ, points, q, r, ref2, results;
            delta += 0.01;
            if (transitionInComplete) {
              dragIO.update();
              Cameras.rotationAngle = dragIO.rotation.x;
              Cameras.positionY = dragIO.rotation.y;
              points = getTowerPathPoints();
              TowerPath.updatePoints(points);
              TowerPath.updateCameraPosition(Cameras.positionY);
              moveLight(Cameras.positionY);
            }
            for (i = q = 0, ref2 = totalBottles; 0 <= ref2 ? q < ref2 : q > ref2; i = 0 <= ref2 ? ++q : --q) {
              child = bottles[i].children[0];
              d = child._d;
              phaseY = child.phaseY;
              phaseZ = child.phaseZ;
              tmpVector.set(d.x, d.y, d.z);
              tmpVector.y += Math.sin(delta + phaseY) * 5;
              bottles[i].children[0].position.set(tmpVector.x, tmpVector.y, tmpVector.z);
            }
            ObjectZoomHelper.update(Cameras.user);
            results = [];
            for (r = 0, len6 = helpers.length; r < len6; r++) {
              helper = helpers[r];
              results.push(helper.update());
            }
            return results;
          };
          renderScene = function(camera, left, bottom, width, height) {
            width = $window.innerWidth;
            height = $window.innerHeight;
            left *= width;
            bottom *= height;
            width *= width;
            height *= height;
            renderer.setScissor(left, bottom, width, height);
            renderer.render(Scene, camera);
            if (Settings.postProcessing) {
              composer.reset();
              composer.render(Scene, camera);
              composer.pass(dirtPass);
              composer.pass(noisePass);
              return composer.toScreen();
            }
          };
          resize = function() {
            var ratio;
            ratio = Win.width / Win.height;
            Cameras.dev.aspect = ratio;
            Cameras.user.aspect = ratio;
            Cameras.dev.updateProjectionMatrix();
            Cameras.user.updateProjectionMatrix();
            if (Settings.postProcessing) {
              composer.setSize(Win.width, Win.height);
              zoomBlurPass.params.center.set(.5 * composer.width, .5 * composer.height);
            }
            return renderer.setSize(Win.width, Win.height);
          };
          render = (function(_this) {
            return function() {
              requestAnimationFrame(render);
              update();
              renderer.enableScissorTest(false);
              renderer.clear();
              renderer.enableScissorTest(true);
              if (Cameras.debug) {
                renderScene(Cameras.user, 0, 0, 0.25, 0.25);
                return renderScene(Cameras.dev, 0, 0, 1, 1);
              } else {
                renderScene(Cameras.dev, 0, 0, 0.25, 0.25);
                return renderScene(Cameras.user, 0, 0, 1, 1);
              }
            };
          })(this);

          /*
          				Events
           */
          initialSetup = function() {
            var duration, params, tween;
            tween = {
              percent: 0
            };
            duration = Utils.lerp(4, 15, Timeline.percent);
            if (env.PHASE !== '1') {
              Materials.HatMaterial.hide();
            }
            Materials.HatMaterial.fadeIn(8);
            params = {
              percent: Timeline.percent,
              ease: Quad.easeInOut,
              onUpdate: (function(_this) {
                return function() {
                  modifier.angle = Utils.lerp(10, 0, tween.percent);
                  modifier.taper = Utils.lerp(0.1, 0, tween.percent);
                  modifier.taperScale = Utils.lerp(0.11, 0, tween.percent);
                  modifier.progress = tween.percent;
                  twist();
                  return IntroPath.updateCameraPosition(0);
                };
              })(this),
              onComplete: (function(_this) {
                return function() {};
              })(this)
            };
            return initialTween = TweenLite.to(tween, duration, params);
          };

          /*
          				Register
           */
          $rootScope.$on('register.upload.photo', (function(_this) {
            return function(x, data) {
              return updateZoomTextures(data.image);
            };
          })(this));
          $rootScope.$on('register.back.clicked', (function(_this) {
            return function() {
              animateObjectOut();
              return Fog.fadeOut();
            };
          })(this));
          $rootScope.$on('register.complete', (function(_this) {
            return function() {
              return registrationNextTransition();
            };
          })(this));
          $rootScope.$on('mobile.register.prev.state', (function(_this) {
            return function() {
              return registrationPrevTransition();
            };
          })(this));
          $rootScope.$on('mobile.register.next.state', (function(_this) {
            return function() {
              return registrationNextTransition();
            };
          })(this));

          /*
          				User popup
           */
          $rootScope.$on('show.user.popup', (function(_this) {
            return function(event, data) {
              console.debug('show.user.popup -->', data);
              Materials.BottleZoomMaterial.resetTexture();
              Materials.ParticleZoomMaterial.resetTexture();
              animateObjectIn(currentObjectData, false);
              return updateZoomTextures(data.profilePicture);
            };
          })(this));
          $rootScope.$on('userpopup.back.clicked', (function(_this) {
            return function() {
              animateObjectOut();
              return Fog.fadeOut();
            };
          })(this));
          objectCycleOutTransition = function(object) {
            var params, screenPosition;
            screenPosition = ObjectZoomHelper.getScreenPositionData().lookatMarker;
            params = {
              x: screenPosition.x,
              y: screenPosition.y,
              z: screenPosition.z
            };
            return TweenMax.to(object.position, 1, params);
          };
          objectCycleInTransition = function(object) {
            var params, screenPositionData;
            screenPositionData = ObjectZoomHelper.getScreenPositionData();
            object.position.copy(screenPositionData.transition);
            params = {
              x: screenPositionData.position.x,
              y: screenPositionData.position.y,
              z: screenPositionData.position.z
            };
            return TweenMax.to(object.position, 1, params);
          };
          $rootScope.$on('popup.cycle.user', (function(_this) {
            return function(event, data) {
              switch (data.assetType) {
                case 'bottle':
                  if (bottleZoomMesh.visible) {
                    objectCycleOutTransition(bottleZoomMesh);
                    Materials.BottleZoomMaterial.hideTransition(function() {
                      objectCycleInTransition(bottleZoomMesh);
                      bottleZoomMesh.visible = true;
                      return Materials.BottleZoomMaterial.showTransition();
                    });
                  } else {
                    objectCycleOutTransition(particleZoomMesh);
                    Materials.ParticleZoomMaterial.hideTransition(function() {
                      particleZoomMesh.visible = false;
                      objectCycleInTransition(bottleZoomMesh);
                      bottleZoomMesh.visible = true;
                      return Materials.BottleZoomMaterial.showTransition();
                    });
                  }
                  break;
                case 'particle':
                  if (particleZoomMesh.visible) {
                    objectCycleOutTransition(particleZoomMesh);
                    Materials.ParticleZoomMaterial.hideTransition(function() {
                      objectCycleInTransition(particleZoomMesh);
                      particleZoomMesh.visible = true;
                      return Materials.ParticleZoomMaterial.showTransition();
                    });
                  } else {
                    objectCycleOutTransition(bottleZoomMesh);
                    Materials.BottleZoomMaterial.hideTransition(function() {
                      bottleZoomMesh.visible = false;
                      objectCycleInTransition(particleZoomMesh);
                      particleZoomMesh.visible = true;
                      return Materials.ParticleZoomMaterial.showTransition();
                    });
                  }
              }
              return updateZoomTextures(data.profilePicture, 1.1);
            };
          })(this));
          $rootScope.$on('$locationChangeStart', (function(_this) {
            return function(locationPath) {
              var id;
              id = Utils.getPath().split('/')[1];
              if (angular.equals(id, 'join')) {
                if (transitionInComplete) {
                  Fog.fadeIn();
                }
              }
              if (angular.equals(id, '')) {
                Fog.fadeOut();
                animateObjectOut();
              }
              if (angular.equals(id, 'register')) {
                initialTween.totalProgress(1).kill();
                Fog.fadeIn();
                if (_this.$scope.userloggedin === false) {
                  Materials.BottleZoomMaterial.resetTexture();
                  Materials.ParticleZoomMaterial.resetTexture();
                  registrationFormOpenTransition();
                }
              }
              if (angular.equals(id, 'explore')) {
                return Fog.fadeOut();
              }
            };
          })(this));
          $scope.$watch('enabled', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue) {
                dragIO.enable();
              } else {
                dragIO.disable();
              }
              if (!newValue) {
                return;
              }
              if (_.isNumber(Utils.getDeeplinkUserIndex()) && (userService.get() != null)) {
                initialTween.totalProgress(1).kill();
                return _this.animateInToUserObject(false);
              } else if (angular.equals(Utils.getUriSegment(1), 'explore')) {
                if (!transitionInComplete) {
                  return _this.animateIn();
                }
              }
            };
          })(this));
          zoom(Cameras.dev, 600);
          initialSetup();
          Win.on('resize', resize);
          objectDrag.on('drag', onObjectDrag);
          objectDrag.on('release', onObjectRelease);
          dragIO.on('mousedown', onMouseDown);
          dragIO.on('mouseup', onMouseUp);
          return setTimeout((function(_this) {
            return function() {
              render();
              $rootScope.$emit('monument.ready');
              return animateIn();
            };
          })(this), 10);
        }
      };
    }

    return MonumentWebgl;

  })();

  angular.module('app').directive('monumentWebgl', ['$window', '$rootScope', '$location', 'GUI', 'TwistModifier', 'lodash', 'ObjectLayout', 'Materials', 'Lights', 'Fog', 'Timeline', 'ObjectZoomHelper', 'Cameras', 'Scene', 'IntroPath', 'TowerPath', 'Win', 'Detect', 'Settings', 'Utils', MonumentWebgl]);

}).call(this);

(function() {
  var slice = [].slice;

  window.c = {
    enable: false,
    clear: function() {
      if ((typeof console !== "undefined" && console !== null) && (console.clear != null)) {
        return console.clear();
      }
    },
    log: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.enable) {
        if ((typeof console !== "undefined" && console !== null) && (console.log != null) && (console.log.apply != null)) {
          return console.log.apply(console, args);
        } else {
          return console.log(args);
        }
      }
    },
    debug: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.enable) {
        if ((typeof console !== "undefined" && console !== null) && (console.debug != null) && (console.debug.apply != null)) {
          return console.debug.apply(console, args);
        } else {
          return console.log(args);
        }
      }
    },
    info: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.enable) {
        if ((typeof console !== "undefined" && console !== null) && (console.info != null) && (console.info.apply != null)) {
          return console.info.apply(console, args);
        } else {
          return console.log(args);
        }
      }
    },
    warn: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.enable) {
        if ((typeof console !== "undefined" && console !== null) && (console.warn != null) && (console.warn.apply != null)) {
          return console.warn.apply(console, args);
        } else {
          return console.log(args);
        }
      }
    },
    error: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.enable) {
        if ((typeof console !== "undefined" && console !== null) && (console.error != null) && (console.error.apply != null)) {
          return console.error.apply(console, args);
        } else {
          return console.log(args);
        }
      }
    }
  };

}).call(this);

(function() {
  var Routes;

  Routes = (function() {
    function Routes($locationProvider) {
      $locationProvider.html5Mode(true);
    }

    return Routes;

  })();

  angular.module('app').config(['$locationProvider', Routes]);

}).call(this);

(function() {
  var Data;

  Data = (function() {
    function Data() {
      var getCountdown;
      getCountdown = function() {
        var _end, _now, date, end, now;
        date = env.COUNTDOWN;
        _now = moment();
        _end = date.split('-');
        now = moment([_now.year(), _now.month(), _now.date()]);
        end = moment([_end[0], _end[1] - 1, _end[2]]);
        return end.diff(now, 'days');
      };
      return {
        getCountdown: getCountdown
      };
    }

    return Data;

  })();

  angular.module('app').service('dataService', [Data]);

}).call(this);

(function() {
  var Cameras;

  Cameras = (function() {
    function Cameras(GUI, $window) {
      var cameraFolder, range, update;
      this.dev = new THREE.PerspectiveCamera(65, $window.innerWidth / $window.innerHeight, 0.1, 100000);
      this.user = new THREE.PerspectiveCamera(65, $window.innerWidth / $window.innerHeight, 0.1, 100000);
      range = 100;
      this.debug = false;
      this.rotationAngle = 0;
      this.positionY = 1;
      this.scaleXZ = 1;
      Happens(this);
      update = (function(_this) {
        return function() {
          return _this.user.updateProjectionMatrix();
        };
      })(this);
      cameraFolder = GUI.addFolder('camera');
      cameraFolder.add(this, 'debug');
      cameraFolder.add(this, 'rotationAngle', -Math.PI, Math.PI).listen();
      cameraFolder.add(this, 'positionY', 0, 1).listen();
      cameraFolder.add(this, 'scaleXZ', 0, 1000).onChange((function(_this) {
        return function() {
          return _this.emit('rotate');
        };
      })(this));
      cameraFolder.add(this.user.position, 'x', -range, range);
      cameraFolder.add(this.user.position, 'y', -range, range);
      cameraFolder.add(this.user.position, 'z', -range, range);
      cameraFolder.open();
      return this;
    }

    return Cameras;

  })();

  angular.module('app').factory('Cameras', ['GUI', '$window', Cameras]);

}).call(this);

(function() {
  var DragIO;

  window.DragIOWebgl = DragIO = (function() {
    function DragIO(element, device) {
      var desktopMousemoveTimeout, directionX, directionY, mc, onClick, onInput, onMouseDown, onMouseMove, onMouseUp, onPanEnd, onPanStart, velocityXScalar, velocityYScalar;
      Happens(this);
      this.mouseX = 0;
      this.mouseY = 0;
      this.mouseLastX = 0;
      this.mouseLastY = 0;
      this.normalX = 0;
      this.normalY = 0;
      this.normalCenterX = 0.1;
      this.normalCenterY = 0.1;
      this.clickedX = 0;
      this.clickedY = 0;
      this.relativeX = 0;
      this.relativeY = 0;
      this.isDown = false;
      directionX = '';
      directionY = '';
      this.velocityX = 0;
      this.velocityY = 0;
      this._velocityX = 0;
      this._velocityY = 0;
      this.positionY = 0;
      this.rotation = {
        x: 0,
        y: 0
      };
      this.isDragging = false;
      this.enabled = false;
      desktopMousemoveTimeout = null;
      this.desktopMousemoveEnabled = true;
      velocityXScalar = device ? 5 : 1;
      velocityYScalar = device ? 0.05 : 0.009;
      onClick = (function(_this) {
        return function(event) {
          _this.clickedX = event.clientX;
          _this.clickedY = event.clientY;
          _this.normalX = (event.clientX / window.innerWidth) * 2 - 1;
          _this.normalY = -(event.clientY / window.innerHeight) * 2 + 1;
          element.removeClass('dragging');
          return _this.emit('click');
        };
      })(this);
      onMouseDown = (function(_this) {
        return function() {
          if (!_this.enabled) {
            return;
          }
          return _this.emit('mousedown');
        };
      })(this);
      onMouseUp = (function(_this) {
        return function() {
          element.removeClass('dragging');
          if (!_this.enabled) {
            return;
          }
          return _this.emit('mouseup');
        };
      })(this);
      onPanStart = (function(_this) {
        return function(event) {
          element.addClass('dragging');
          _this.desktopMousemoveEnabled = false;
          _this.isDown = true;
          TweenMax.killTweensOf(_this);
          _this.clickedX = event.center.x;
          _this.clickedY = event.center.y;
          _this.relativeX = 0;
          return _this.relativeY = 0;
        };
      })(this);
      onPanEnd = (function(_this) {
        return function(event) {
          var params;
          element.removeClass('dragging');
          _this.isDown = false;
          TweenMax.killTweensOf(_this);
          params = {
            _velocityX: 0,
            _velocityY: 0
          };
          TweenMax.to(_this, 1, params);
          clearInterval(desktopMousemoveTimeout);
          return desktopMousemoveTimeout = setTimeout(function() {
            return _this.desktopMousemoveEnabled = true;
          }, 1500);
        };
      })(this);
      onInput = (function(_this) {
        return function(event) {
          if (event.distance > 0) {
            _this.isDragging = true;
          } else {
            _this.isDragging = false;
          }
          if (event.direction === 2) {
            directionX = 'left';
          } else {
            directionX = 'right';
          }
          _this.velocityX = event.velocityX * velocityXScalar;
          _this.velocityY = event.deltaY / 200;
          _this.velocityY = THREE.Math.clamp(_this.velocityY, -1, 1);
          _this._velocityY = _this.velocityY * velocityYScalar;
          _this.mouseLastX = _this.mouseX;
          _this.mouseLastY = _this.mouseY;
          _this.mouseX = event.center.x;
          _this.mouseY = event.center.y;
          _this.relativeX = _this.mouseX - _this.clickedX;
          _this.relativeY = _this.mouseY - _this.clickedY;
          if (_this.mouseX > _this.clickedX) {
            directionX = 'right';
          } else {
            directionX = 'left';
          }
          if (_this.mouseY > _this.clickedY) {
            return directionY = 'up';
          } else {
            return directionY = 'down';
          }
        };
      })(this);
      onMouseMove = (function(_this) {
        return function(event) {
          if (!_this.enabled) {
            return;
          }
          if (_this.isDown) {
            return;
          }
          if (!_this.desktopMousemoveEnabled) {
            return;
          }
          _this.clickedX = event.clientX;
          _this.clickedY = event.clientY;
          _this.normalX = (event.clientX / window.innerWidth) * 2 - 1;
          _this.normalY = -(event.clientY / window.innerHeight) * 2 + 1;
          return _this.emit('mousemove');
        };
      })(this);
      this.update = (function(_this) {
        return function() {
          if (_this.isDown) {
            _this._velocityX = _this.velocityX * 0.025;
          }
          _this.rotation.x += _this._velocityX;
          _this.rotation.y += _this._velocityY;
          return _this.rotation.y = THREE.Math.clamp(_this.rotation.y, 0, 1);
        };
      })(this);
      this.enable = function() {
        return this.enabled = true;
      };
      this.disable = function() {
        return this.enabled = false;
      };
      mc = new Hammer(element.get(0));
      mc.get('pan').set({
        direction: Hammer.DIRECTION_ALL
      });
      mc.on('panstart', onPanStart);
      mc.on('panend', onPanEnd);
      mc.on('hammer.input', onInput);
      element.on('click', onClick);
      element.on('mousedown', onMouseDown);
      element.on('mousemove', onMouseMove);
      element.on('mouseup', onMouseUp);
    }

    return DragIO;

  })();

}).call(this);

(function() {
  var Fog;

  Fog = (function() {
    function Fog(GUI, Cameras, Utils) {
      var DURATION, FOG_IN_DEFAULT, FOG_OUT_DEFAULT, cameraPosition, controller, fadeIn, fadeOut, fog, folder, update, zero;
      FOG_IN_DEFAULT = 0.0002;
      FOG_OUT_DEFAULT = 0.00226;
      DURATION = 1;
      controller = {
        percent: 0,
        fog: 0.002
      };
      fog = new THREE.FogExp2(0x000000, FOG_IN_DEFAULT);
      folder = GUI.addFolder('fog');
      folder.add(fog, 'density', 0, 0.01).listen();
      folder.add(controller, 'percent', 0, 1).listen();
      folder.add(controller, 'fog', 0, 0.1);
      fadeIn = function() {
        var params;
        params = {
          percent: 1,
          onUpdate: (function(_this) {
            return function() {
              return update();
            };
          })(this)
        };
        return TweenMax.to(controller, DURATION, params);
      };
      fadeOut = function() {
        var params;
        params = {
          percent: 0,
          onUpdate: (function(_this) {
            return function() {
              return update();
            };
          })(this)
        };
        return TweenMax.to(controller, DURATION, params);
      };
      zero = new THREE.Vector3();
      cameraPosition = new THREE.Vector3();
      update = function() {
        var distance, percent;
        cameraPosition.set(Cameras.user.position.x, 0, Cameras.user.position.z);
        distance = cameraPosition.distanceTo(zero);
        percent = 1 - (distance / 3500);
        percent = THREE.Math.clamp(percent, 0, 1);
        return fog.density = (percent * controller.fog) * controller.percent;
      };
      return {
        fog: fog,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        update: update
      };
    }

    return Fog;

  })();

  angular.module('app').factory('Fog', ['GUI', 'Cameras', 'Utils', Fog]);

}).call(this);

(function() {
  var Lights;

  Lights = (function() {
    function Lights(GUI) {
      var all, ambLight, createFolder, dirLight, dirLight2, lightFolder, lights, lightsKeys, pointLight, update;
      lights = {
        ambient: {
          color: 0x010101
        },
        directional: {
          color: 0xDed4cc,
          position: {
            x: -1000,
            y: 500,
            z: 1000
          }
        },
        directional2: {
          color: 0x6f8c8b,
          position: {
            x: -10,
            y: 10,
            z: -10
          }
        },
        point: {
          color: 0x6c4c3f,
          position: {
            x: 0,
            y: 0,
            z: 0
          }
        }
      };
      ambLight = new THREE.AmbientLight(lights.ambient.color);
      dirLight = new THREE.DirectionalLight(lights.directional.color, 1);
      dirLight2 = new THREE.DirectionalLight(lights.directional2.color, 1);
      pointLight = new THREE.PointLight(lights.point.color, 4, 500);
      all = [ambLight, dirLight, dirLight2, pointLight];
      lightsKeys = ['ambient', 'directional', 'directional2', 'point'];
      dirLight.castShadow = true;
      dirLight.position.set(lights.directional.position.x, lights.directional.position.y, lights.directional.position.z);
      dirLight2.position.set(lights.directional2.position.x, lights.directional2.position.y, lights.directional2.position.z);
      pointLight.position.set(lights.point.position.x, lights.point.position.y, lights.point.position.z);
      dirLight.position.set(-1000, 500, 1000);
      dirLight2.position.set(-1000, 1000, -1000);
      lightFolder = GUI.addFolder('lights');
      update = function() {
        var i, j, len, light, results;
        results = [];
        for (i = j = 0, len = all.length; j < len; i = ++j) {
          light = all[i];
          results.push(light.color.setHex(String(lights[lightsKeys[i]].color).replace('0x', '#')));
        }
        return results;
      };
      createFolder = function(light, type) {
        var folder, positionRange, rotationRange;
        folder = lightFolder.addFolder(type);
        positionRange = 1000;
        rotationRange = Math.PI;
        folder.addColor(lights[type], 'color').name(type).onChange(update);
        folder.add(light.position, 'x', -positionRange, positionRange).name('position x');
        folder.add(light.position, 'y', -positionRange, positionRange).name('position y');
        folder.add(light.position, 'z', -positionRange, positionRange).name('position z');
        folder.add(light.rotation, 'x', -rotationRange, rotationRange).name('rotation x');
        folder.add(light.rotation, 'y', -rotationRange, rotationRange).name('rotation y');
        folder.add(light.rotation, 'z', -rotationRange, rotationRange).name('rotation z');
        return folder.open();
      };
      createFolder(ambLight, 'ambient');
      createFolder(dirLight, 'directional');
      createFolder(dirLight2, 'directional2');
      createFolder(pointLight, 'point');
      return {
        ambient: ambLight,
        directional: dirLight,
        directional2: dirLight2,
        point: pointLight,
        all: all
      };
    }

    return Lights;

  })();

  angular.module('app').factory('Lights', ['GUI', Lights]);

}).call(this);

(function() {
  var ObjectDragIOWebgl;

  window.ObjectDragIOWebgl = ObjectDragIOWebgl = (function() {
    function ObjectDragIOWebgl(element, device, Win) {
      var onDown, onMove, onUp, promise;
      Happens(this);
      this.isDown = false;
      this.x = 0;
      this.y = 0;
      this.enabled = false;
      this.activeElement = false;
      this.isRegister = false;
      this.tiltController = false;
      this.timeout = null;
      if (device) {
        promise = new FULLTILT.getDeviceOrientation({
          'type': 'world'
        });
        promise.then((function(_this) {
          return function(tiltController) {
            _this.tiltController = tiltController;
          };
        })(this))["catch"](function(message) {
          return c.error(message);
        });
        ((function(_this) {
          return function() {};
        })(this))();
      }
      onDown = (function(_this) {
        return function(event) {
          _this.isDown = true;
          element.addClass('dragging');
          return event.preventDefault();
        };
      })(this);
      onUp = (function(_this) {
        return function(event) {
          _this.isDown = false;
          element.removeClass('dragging');
          return _this.emit('release');
        };
      })(this);
      onMove = (function(_this) {
        return function(event) {
          var height, offset, width, x, y;
          clearTimeout(_this.timeout);
          if (!_this.enabled) {
            return;
          }
          x = event.pageX;
          y = event.pageY;
          offset = _this.activeElement.offset();
          width = _this.activeElement.width();
          height = _this.activeElement.height();
          _this.x = (x - offset.left) / width;
          _this.y = (y - offset.top) / height;
          _this.x = THREE.Math.clamp(_this.x, 0, 1);
          _this.y = THREE.Math.clamp(_this.y, 0, 1);
          return _this.emit('drag', {
            x: _this.x,
            y: _this.y
          });
        };
      })(this);
      element.on('mousedown', onDown);
      $('body').on('mouseup', onUp);
      if (!device) {
        element.on('mousemove', onMove);
        element.on('mouseleave', (function(_this) {
          return function() {
            return _this.timeout = setTimeout(onUp, 2000);
          };
        })(this));
      }
      this.update = (function(_this) {
        return function() {
          var euler;
          requestAnimationFrame(_this.update);
          if (_this.tiltController) {
            euler = _this.tiltController.getScreenAdjustedEuler();
            _this.x = euler.gamma.map(-25, 25, 0, 1);
            return _this.emit('drag', {
              x: _this.x,
              y: 0.5
            });
          }
        };
      })(this);
      this.update();
    }

    ObjectDragIOWebgl.prototype.enable = function() {
      return this.enabled = true;
    };

    ObjectDragIOWebgl.prototype.disable = function() {
      return this.enabled = false;
    };

    ObjectDragIOWebgl.prototype.setActiveElement = function(activeElement, isRegister) {
      this.activeElement = activeElement;
      this.isRegister = isRegister;
    };

    return ObjectDragIOWebgl;

  })();

}).call(this);

(function() {
  var ObjectLayout,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ObjectLayout = (function() {
    function ObjectLayout(lodash) {
      var count, data, dataOrdered, generate, getFormatted, getOrder, getTotalBottles, getTotalParticles, totalBottles, totalParticles;
      data = [];
      totalBottles = 0;
      totalParticles = 0;
      dataOrdered = [];
      count = 0;
      generate = function() {
        var bottleIndices, col, i, j, k, row, side, type;
        for (row = i = 0; i < 25; row = ++i) {
          data[row] = [];
          for (side = j = 0; j < 4; side = ++j) {
            data[row][side] = [];
            bottleIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            bottleIndices = lodash.shuffle(bottleIndices);
            if (env.WEBGL) {
              bottleIndices = bottleIndices.splice(0, 2);
            } else {
              bottleIndices = bottleIndices.splice(0, 6);
            }
            for (col = k = 0; k < 12; col = ++k) {
              if (indexOf.call(bottleIndices, col) >= 0) {
                type = 'bottle';
                totalBottles++;
              } else {
                type = 'particle';
                totalParticles++;
              }
              data[row][side].push(type);
              dataOrdered.push(type);
              count++;
              if (env.WEBGL === false && count >= 200) {
                return;
              }
            }
          }
        }
      };
      generate();
      getFormatted = function() {
        return data;
      };
      getOrder = function() {
        return dataOrdered;
      };
      getTotalBottles = function() {
        return totalBottles;
      };
      getTotalParticles = function() {
        return totalParticles;
      };
      return {
        getTotalBottles: getTotalBottles,
        getTotalParticles: getTotalParticles,
        getFormatted: getFormatted,
        getOrder: getOrder
      };
    }

    return ObjectLayout;

  })();

  angular.module('app').factory('ObjectLayout', ['lodash', ObjectLayout]);

}).call(this);

(function() {
  var ObjectZoomHelper;

  THREE.Box2Helper = (function() {
    function Box2Helper(bounds) {
      var geometry, params;
      geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(bounds.min.x, bounds.min.y, 0));
      geometry.vertices.push(new THREE.Vector3(bounds.max.x, bounds.min.y, 0));
      geometry.vertices.push(new THREE.Vector3(bounds.max.x, bounds.max.y, 0));
      geometry.vertices.push(new THREE.Vector3(bounds.min.x, bounds.max.y, 0));
      geometry.vertices.push(new THREE.Vector3(bounds.min.x, bounds.min.y, 0));
      params = {
        color: 0x00FF00,
        wireframe: true,
        linewidth: 50
      };
      return new THREE.Line(geometry, new THREE.LineBasicMaterial(params));
    }

    return Box2Helper;

  })();

  ObjectZoomHelper = (function() {
    function ObjectZoomHelper(Scene, Cameras, GUI, Point, Detect, Responsive, Win, Utils) {
      var bounds, cameraEndPosition, cameraLookat, folder, getScreenPositionData, helper, localToWorld, objectPositionLookAtMarker, objectPositionMarker, objectPositionTransitionMarker, size, update, updateMarkerPosition;
      size = 100;
      bounds = new THREE.Box2(new THREE.Vector2(-size, -size), new THREE.Vector2(size, size));
      cameraLookat = new THREE.Vector3(0, 0, -1);
      cameraEndPosition = new THREE.Vector3();
      helper = new THREE.Box2Helper(bounds);
      objectPositionMarker = Point.create(10);
      objectPositionLookAtMarker = Point.create(10, 0x00FF00);
      objectPositionTransitionMarker = Point.create(10, 0x0000FF);
      if (Detect.mobile) {
        objectPositionMarker.position.set(0, 20, 0);
      } else {
        updateMarkerPosition = function() {
          var maxWidth, minWidth, percent, position, x;
          minWidth = 768;
          maxWidth = 1440;
          percent = (Win.width - minWidth) / maxWidth;
          percent = THREE.Math.clamp(percent, 0, 1);
          x = Utils.lerp(-24, -30, percent);
          position = [-26, -4, 0];
          return objectPositionMarker.position.fromArray(position);
        };
        Win.on('resize', (function(_this) {
          return function() {
            return updateMarkerPosition();
          };
        })(this));
        updateMarkerPosition();
      }
      helper.visible = false;
      objectPositionMarker.visible = false;
      objectPositionLookAtMarker.visible = false;
      objectPositionTransitionMarker.visible = false;
      helper.add(objectPositionMarker);
      helper.add(objectPositionLookAtMarker);
      helper.add(objectPositionTransitionMarker);
      Scene.add(helper);
      folder = GUI.addFolder('ObjectZoomHelper');
      folder.add(objectPositionMarker.position, 'x', -size, size).name('position x');
      folder.add(objectPositionMarker.position, 'y', -size, size).name('position y');
      folder.add(objectPositionMarker.position, 'z', -size, size).name('position z');
      localToWorld = function(object, parent) {
        var position;
        Scene.updateMatrixWorld();
        helper.updateMatrixWorld();
        position = object.position.clone();
        return position.applyMatrix4(parent.matrixWorld);
      };
      getScreenPositionData = function() {
        var lookat, lookatMarker, position, transition;
        position = localToWorld(objectPositionMarker, helper);
        lookat = localToWorld(objectPositionLookAtMarker, helper);
        transition = localToWorld(objectPositionTransitionMarker, helper);
        lookatMarker = localToWorld(objectPositionLookAtMarker, helper);
        return {
          position: position,
          lookat: lookat,
          transition: transition,
          lookatMarker: lookatMarker
        };
      };
      update = function(camera) {
        var distance, pos, position;
        position = camera.position;
        cameraLookat.set(0, 0, -1);
        cameraLookat.applyQuaternion(camera.quaternion.clone());
        distance = 140;
        cameraEndPosition.copy(position);
        cameraEndPosition.x += distance * cameraLookat.x;
        cameraEndPosition.y += distance * cameraLookat.y;
        cameraEndPosition.z += distance * cameraLookat.z;
        helper.position.copy(cameraEndPosition);
        helper.lookAt(position);
        pos = objectPositionMarker.position;
        objectPositionLookAtMarker.position.set(pos.x, pos.y, 50);
        return objectPositionTransitionMarker.position.set(pos.x, pos.y, -50);
      };
      return {
        getScreenPositionData: getScreenPositionData,
        update: update
      };
    }

    return ObjectZoomHelper;

  })();

  angular.module('app').factory('ObjectZoomHelper', ['Scene', 'Cameras', 'GUI', 'Point', 'Detect', 'Responsive', 'Win', 'Utils', ObjectZoomHelper]);

}).call(this);

(function() {
  var Point;

  Point = (function() {
    function Point(Scene) {
      var create;
      create = function(size, color) {
        var geometry, mesh;
        if (color == null) {
          color = 0xFF0000;
        }
        geometry = new THREE.SphereGeometry(size, 4, 4);
        mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
          color: 0xFF0000,
          wireframe: true
        }));
        return mesh;
      };
      return {
        create: create
      };
    }

    return Point;

  })();

  angular.module('app').factory('Point', ['Scene', Point]);

}).call(this);

(function() {
  var Scene;

  Scene = (function() {
    function Scene() {
      var scene;
      scene = new THREE.Scene();
      return scene;
    }

    return Scene;

  })();

  angular.module('app').factory('Scene', [Scene]);

}).call(this);

(function() {
  var Settings;

  Settings = (function() {
    function Settings(Detect) {
      this.postProcessing = true;
      this.clickEvent = Detect.device ? 'touchstart' : 'click';
      return this;
    }

    return Settings;

  })();

  angular.module('app').factory('Settings', ['Detect', Settings]);

}).call(this);

(function() {
  var TwistModifier;

  TwistModifier = (function() {
    function TwistModifier() {
      var angle, twist, twistAndTaper;
      this._angle = 0;
      angle = (function(_this) {
        return function(_angle) {
          _this._angle = _angle != null ? _angle : 0;
        };
      })(this);
      twist = (function(_this) {
        return function(vector, i) {
          var axis, phase;
          axis = new THREE.Vector3(0, 1, 0);
          phase = 0.1;
          vector.applyAxisAngle(axis, _this._angle * i * phase);
          return vector;
        };
      })(this);
      twistAndTaper = (function(_this) {
        return function(vector, i, taper, taperScale, gradient) {
          var axis, phase, scalar;
          axis = new THREE.Vector3(0, 1, 0);
          phase = 0.0005;
          vector.applyAxisAngle(axis, (_this._angle * i * phase) * gradient);
          scalar = 1 + ((i * taperScale) * taper) * gradient;
          vector.x *= scalar;
          vector.z *= scalar;
          return vector;
        };
      })(this);
      return {
        twist: twist,
        twistAndTaper: twistAndTaper,
        angle: angle
      };
    }

    return TwistModifier;

  })();

  angular.module('app').factory('TwistModifier', [TwistModifier]);

}).call(this);

(function() {
  var Utils;

  Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  };

  _.mixin({
    'findByValues': function(collection, property, values) {
      return _.filter(collection, function(item) {
        return _.contains(values, item[property]);
      });
    }
  });

  Utils = (function() {
    function Utils(Win, $location) {
      var closestBottleToCamera, closestParticleToCamera, degrees, delay, getDeeplinkUserIndex, getPath, getUriSegment, lerp, radians, randomArrayItem, toScreenPosition;
      lerp = function(min, max, alpha) {
        return min + ((max - min) * alpha);
      };
      delay = function(delay, func) {
        return setTimeout(func, delay * 1000);
      };
      degrees = function(radians) {
        return radians * (180 / Math.PI);
      };
      radians = function(degrees) {
        return degrees * (Math.PI / 180);
      };
      randomArrayItem = function(array) {
        var index;
        index = Math.floor(Math.random() * array.length);
        return {
          index: index,
          item: array[index]
        };
      };
      getPath = function() {
        return $location.path().replace('/' + env.LOCALE, '');
      };
      getUriSegment = function(index) {
        return getPath().split('/')[index] || false;
      };
      getDeeplinkUserIndex = function() {
        var index;
        index = getPath().split('/')[2];
        if (index) {
          return Number(index);
        } else {
          return false;
        }
      };
      closestBottleToCamera = function(bottles, cameraPosition) {
        var bottle, distance, distances, i, j, k, len, len1, minDistance, minDistanceIndex;
        distances = [];
        for (j = 0, len = bottles.length; j < len; j++) {
          bottle = bottles[j];
          distances.push(bottle.position.distanceTo(cameraPosition));
        }
        minDistance = Infinity;
        minDistanceIndex = -1;
        for (i = k = 0, len1 = distances.length; k < len1; i = ++k) {
          distance = distances[i];
          if (distance < minDistance) {
            minDistanceIndex = i;
            minDistance = distance;
          }
        }
        return minDistanceIndex;
      };
      closestParticleToCamera = function(vertices, cameraPosition) {
        var distance, distances, i, j, k, len, len1, minDistance, minDistanceIndex, v;
        distances = [];
        for (j = 0, len = vertices.length; j < len; j++) {
          v = vertices[j];
          distances.push(v.distanceTo(cameraPosition));
        }
        minDistance = Infinity;
        minDistanceIndex = -1;
        for (i = k = 0, len1 = distances.length; k < len1; i = ++k) {
          distance = distances[i];
          if (distance < minDistance) {
            minDistanceIndex = i;
            minDistance = distance;
          }
        }
        return minDistanceIndex;
      };

      /*
      		https://github.com/mrdoob/three.js/issues/78
       */
      toScreenPosition = function(vector, camera) {
        vector.project(camera);
        vector.x = Math.round((vector.x + 1) * Win.width / 2);
        vector.y = Math.round((-vector.y + 1) * Win.height / 2);
        vector.z = 0;
        return {
          x: vector.x,
          y: vector.y
        };
      };
      return {
        lerp: lerp,
        degrees: degrees,
        radians: radians,
        delay: delay,
        toScreenPosition: toScreenPosition,
        randomArrayItem: randomArrayItem,
        closestBottleToCamera: closestBottleToCamera,
        closestParticleToCamera: closestParticleToCamera,
        getDeeplinkUserIndex: getDeeplinkUserIndex,
        getUriSegment: getUriSegment,
        getPath: getPath
      };
    }

    return Utils;

  })();

  angular.module('app').factory('Utils', ['Win', '$location', Utils]);

}).call(this);

(function() {
  var BaseMaterial;

  BaseMaterial = (function() {
    function BaseMaterial(GUI, Detect) {
      var bumpmap, map, material, params;
      if (env.WEBGL === false) {
        return {};
      }
      map = THREE.ImageUtils.loadTexture(Assets.getAsset('BaseTexture').url);
      bumpmap = THREE.ImageUtils.loadTexture(Assets.getAsset('BaseTextureBump').url);
      params = {
        map: map,
        specular: 0x101218,
        shininess: 80,
        bumpMap: bumpmap,
        specularMap: bumpmap,
        bumpScale: 1
      };
      material = new THREE.MeshPhongMaterial(params);
      return {
        material: material
      };
    }

    return BaseMaterial;

  })();

  angular.module('app').factory('BaseMaterial', ['GUI', 'Detect', BaseMaterial]);

}).call(this);

(function() {
  var BottleMaterial;

  BottleMaterial = (function() {
    function BottleMaterial(GUI) {
      var config, folder, map, material, params, textureURLs, update;
      if (env.WEBGL === false) {
        return {};
      }
      folder = GUI.addFolder('BottleMaterial');
      textureURLs = [Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url];
      map = THREE.ImageUtils.loadTextureCube(textureURLs);
      config = {
        color: '#050605',
        ambient: 0xFFFFFF,
        emissive: '#000000',
        specular: 0xFFFaac
      };
      params = {
        color: config.color,
        ambient: config.ambient,
        emissive: config.emissive,
        specular: config.specular,
        shininess: 38,
        wireframe: false,
        opacity: 0.92,
        transparent: true,
        shading: THREE.SmoothShading,
        side: THREE.DoubleSide,
        emissive: 0x0a180a,
        envMap: map,
        combine: THREE.AddOperation,
        reflectivity: 1,
        refractionRatio: 0.6
      };
      material = new THREE.MeshPhongMaterial(params);
      update = function() {
        material.color.setHex(String(config.color).replace('#', '0x'));
        material.emissive.setHex(String(config.emissive).replace('#', '0x'));
        return material.specular.setHex(String(config.specular).replace('#', '0x'));
      };
      folder.addColor(config, 'color').onChange(update);
      folder.addColor(config, 'emissive').onChange(update);
      folder.addColor(config, 'specular').onChange(update);
      folder.add(material, 'shininess', 0, 100);
      folder.add(material, 'wireframe');
      folder.add(material, 'opacity', 0, 1);
      return {
        material: material
      };
    }

    return BottleMaterial;

  })();

  angular.module('app').factory('BottleMaterial', ['GUI', BottleMaterial]);

}).call(this);

(function() {
  var BottleZoomMaterial;

  BottleZoomMaterial = (function() {
    function BottleZoomMaterial(GUI) {
      var DEFAULT_PHOTO_OPACITY, bottleMaterial, config, fadeIn, fadeOut, folder, hideTransition, params, photoMaterial, resetOpacity, resetTexture, showTransition, update, updatePhotoTexture;
      if (env.WEBGL === false) {
        return {};
      }
      folder = GUI.addFolder('BottleMaterial x');
      folder.open();
      DEFAULT_PHOTO_OPACITY = 0.4;
      config = {
        color: '#151615',
        ambient: 0xFFFFFF,
        emissive: '#0a180a',
        specular: 0xFFFaac
      };
      params = {
        color: config.color,
        ambient: config.ambient,
        emissive: config.emissive,
        specular: config.specular,
        shininess: 38,
        opacity: 0.92,
        transparent: true,
        shading: THREE.SmoothShading,
        fog: false
      };
      bottleMaterial = new THREE.MeshPhongMaterial(params);
      update = function() {};
      folder.add(bottleMaterial, 'opacity', 0, 1);
      params = {
        alphaMap: THREE.ImageUtils.loadTexture(Assets.getAsset('BottleAlphaMap').url),
        transparent: true,
        opacity: DEFAULT_PHOTO_OPACITY
      };
      photoMaterial = new THREE.MeshBasicMaterial(params);
      updatePhotoTexture = function(url, delay) {
        var image;
        if (delay == null) {
          delay = 0.2;
        }
        resetTexture();
        image = document.createElement('img');
        image.crossOrigin = '';
        TweenLite.killTweensOf(photoMaterial);
        photoMaterial.opacity = 0;
        image.onload = (function(_this) {
          return function() {
            var texture;
            texture = new THREE.Texture(image);
            texture.needsUpdate = true;
            photoMaterial.map = texture;
            photoMaterial.needsUpdate = true;
            params = {
              opacity: DEFAULT_PHOTO_OPACITY,
              delay: delay
            };
            return TweenMax.to(photoMaterial, 1, params);
          };
        })(this);
        return image.src = url;
      };
      fadeOut = (function(_this) {
        return function() {
          params = {
            opacity: 0
          };
          return TweenMax.allTo([bottleMaterial, photoMaterial], 1, params);
        };
      })(this);
      fadeIn = (function(_this) {
        return function() {
          bottleMaterial.opacity = 0;
          photoMaterial.opacity = 0;
          params = {
            opacity: 1
          };
          return TweenMax.to(bottleMaterial, 0.6, params);
        };
      })(this);
      hideTransition = function(callback) {
        params = {
          opacity: 0,
          onComplete: (function(_this) {
            return function() {
              return typeof callback === "function" ? callback() : void 0;
            };
          })(this)
        };
        return TweenMax.allTo([bottleMaterial, photoMaterial], 1, params);
      };
      showTransition = function() {
        return fadeIn();
      };
      resetOpacity = function() {
        return bottleMaterial.opacity = 1;
      };
      resetTexture = function() {
        photoMaterial.opacity = 0;
        photoMaterial.map = null;
        return photoMaterial.needsUpdate = true;
      };
      return {
        bottleMaterial: bottleMaterial,
        photoMaterial: photoMaterial,
        updatePhotoTexture: updatePhotoTexture,
        fadeOut: fadeOut,
        fadeIn: fadeIn,
        hideTransition: hideTransition,
        showTransition: showTransition,
        resetOpacity: resetOpacity,
        resetTexture: resetTexture
      };
    }

    return BottleZoomMaterial;

  })();

  angular.module('app').factory('BottleZoomMaterial', ['GUI', BottleZoomMaterial]);

}).call(this);

(function() {
  var DomeMaterial;

  DomeMaterial = (function() {
    function DomeMaterial(GUI) {
      var map, material, params;
      if (env.WEBGL === false) {
        return {};
      }
      map = THREE.ImageUtils.loadTexture(Assets.getAsset('SkyTexture').url);
      params = {
        map: map,
        lights: false,
        fog: false
      };
      material = new THREE.MeshLambertMaterial(params);
      return {
        material: material
      };
    }

    return DomeMaterial;

  })();

  angular.module('app').factory('DomeMaterial', ['GUI', DomeMaterial]);

}).call(this);

(function() {
  var GroundMaterial;

  GroundMaterial = (function() {
    function GroundMaterial(GUI) {
      var bumpmap, map, material, params;
      if (env.WEBGL === false) {
        return {};
      }
      map = THREE.ImageUtils.loadTexture(Assets.getAsset('FloorTexture').url);
      bumpmap = THREE.ImageUtils.loadTexture(Assets.getAsset('FloorTextureBump').url);
      params = {
        map: map,
        bumpMap: bumpmap,
        bumpScale: 2,
        specular: 0x101218,
        specularMap: bumpmap,
        shininess: 60,
        side: THREE.DoubleSide
      };
      material = new THREE.MeshPhongMaterial(params);
      GUI.add(material, 'bumpScale', 0, 100);
      return {
        material: material
      };
    }

    return GroundMaterial;

  })();

  angular.module('app').factory('GroundMaterial', ['GUI', GroundMaterial]);

}).call(this);

(function() {
  var HatMaterial;

  HatMaterial = (function() {
    function HatMaterial(GUI, Detect) {
      var config, fadeIn, hide, map, map2, material, params, textureURLs;
      if (env.WEBGL === false) {
        return {};
      }
      textureURLs = [Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url, Assets.getAsset('BottleTexture').url];
      map = THREE.ImageUtils.loadTextureCube(textureURLs);
      map2 = THREE.ImageUtils.loadTexture(Assets.getAsset('BaseTexture').url);
      config = {
        color: '#050605',
        ambient: 0xFFFFFF,
        emissive: '#000000',
        specular: 0xcfffac
      };
      params = {
        map: map2,
        color: config.color,
        specular: config.specular,
        shininess: 100,
        wireframe: false,
        opacity: 0.93,
        transparent: true,
        shading: THREE.SmoothShading,
        side: THREE.DoubleSide,
        envMap: map,
        combine: THREE.AddOperation,
        reflectivity: 1,
        refractionRatio: 0.6,
        bumpMap: map2,
        bumpScale: 0.5
      };
      material = new THREE.MeshPhongMaterial(params);
      fadeIn = function(delay) {
        if (delay == null) {
          delay = 0;
        }
        material.opacity = 0;
        params = {
          opacity: 0.93,
          delay: delay
        };
        return TweenMax.to(material, 5, params);
      };
      hide = function() {
        return material.opacity = 0;
      };
      return {
        material: material,
        fadeIn: fadeIn,
        hide: hide
      };
    }

    return HatMaterial;

  })();

  angular.module('app').factory('HatMaterial', ['GUI', 'Detect', HatMaterial]);

}).call(this);

(function() {
  var Materials;

  Materials = (function() {
    function Materials(ParticleMaterial, ParticleZoomMaterial, BottleMaterial, BottleZoomMaterial, GroundMaterial, BaseMaterial, DomeMaterial, HatMaterial) {
      return {
        BottleMaterial: BottleMaterial,
        BottleZoomMaterial: BottleZoomMaterial,
        ParticleMaterial: ParticleMaterial,
        DomeMaterial: DomeMaterial,
        ParticleZoomMaterial: ParticleZoomMaterial,
        GroundMaterial: GroundMaterial,
        BaseMaterial: BaseMaterial,
        HatMaterial: HatMaterial
      };
    }

    return Materials;

  })();

  angular.module('app').factory('Materials', ['ParticleMaterial', 'ParticleZoomMaterial', 'BottleMaterial', 'BottleZoomMaterial', 'GroundMaterial', 'BaseMaterial', 'DomeMaterial', 'HatMaterial', Materials]);

}).call(this);

(function() {
  var ParticleMaterial;

  ParticleMaterial = (function() {
    function ParticleMaterial(Fog, Settings) {
      var hideParticle, material, params, showParticle;
      if (env.WEBGL === false) {
        return {};
      }
      params = {
        size: 20,
        map: THREE.ImageUtils.loadTexture(Assets.getAsset('Particle').url),
        transparent: true,
        alphaTest: 0.1,
        fog: true
      };
      material = new THREE.PointCloudMaterial(params);
      hideParticle = function(index) {};
      showParticle = function(index) {};
      return {
        material: material,
        hideParticle: hideParticle,
        showParticle: showParticle
      };
    }

    return ParticleMaterial;

  })();

  angular.module('app').factory('ParticleMaterial', ['Fog', 'Settings', ParticleMaterial]);

}).call(this);

(function() {
  var ParticleZoomMaterial;

  ParticleZoomMaterial = (function() {
    function ParticleZoomMaterial() {
      var DEFAULT_PHOTO_OPACITY, fadeIn, fadeOut, hideTransition, params, particleMaterial, photoMaterial, resetOpacity, resetTexture, showTransition, updatePhotoTexture;
      if (env.WEBGL === false) {
        return {};
      }
      DEFAULT_PHOTO_OPACITY = 0.4;
      params = {
        map: THREE.ImageUtils.loadTexture(Assets.getAsset('Particle').url),
        transparent: true,
        fog: false,
        side: THREE.DoubleSide
      };
      particleMaterial = new THREE.MeshBasicMaterial(params);
      params = {
        alphaMap: THREE.ImageUtils.loadTexture(Assets.getAsset('ParticleAlphaMap').url),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: DEFAULT_PHOTO_OPACITY
      };
      photoMaterial = new THREE.MeshBasicMaterial(params);
      updatePhotoTexture = function(url, delay) {
        var image;
        if (delay == null) {
          delay = 0.2;
        }
        image = document.createElement('img');
        image.crossOrigin = '';
        TweenLite.killTweensOf(photoMaterial);
        photoMaterial.opacity = 0;
        image.onload = (function(_this) {
          return function() {
            var texture;
            texture = new THREE.Texture(image);
            texture.needsUpdate = true;
            photoMaterial.map = texture;
            photoMaterial.needsUpdate = true;
            params = {
              opacity: DEFAULT_PHOTO_OPACITY,
              delay: delay
            };
            return TweenMax.to(photoMaterial, 1, params);
          };
        })(this);
        return image.src = url;
      };
      fadeOut = (function(_this) {
        return function() {
          params = {
            opacity: 0
          };
          return TweenMax.allTo([particleMaterial, photoMaterial], 0.6, params);
        };
      })(this);
      fadeIn = (function(_this) {
        return function() {
          particleMaterial.opacity = 0;
          photoMaterial.opacity = DEFAULT_PHOTO_OPACITY;
          params = {
            opacity: 1
          };
          return TweenMax.to(particleMaterial, 0.6, params);
        };
      })(this);
      hideTransition = function(callback) {
        params = {
          opacity: 0,
          onComplete: (function(_this) {
            return function() {
              return typeof callback === "function" ? callback() : void 0;
            };
          })(this)
        };
        return TweenMax.allTo([particleMaterial, photoMaterial], 1, params);
      };
      showTransition = function() {
        return fadeIn();
      };
      resetOpacity = function() {
        particleMaterial.opacity = 1;
        return photoMaterial.opacity = DEFAULT_PHOTO_OPACITY;
      };
      resetTexture = function() {
        photoMaterial.map = null;
        return photoMaterial.needsUpdate = true;
      };
      return {
        particleMaterial: particleMaterial,
        photoMaterial: photoMaterial,
        updatePhotoTexture: updatePhotoTexture,
        fadeOut: fadeOut,
        hideTransition: hideTransition,
        showTransition: showTransition,
        resetOpacity: resetOpacity,
        resetTexture: resetTexture
      };
    }

    return ParticleZoomMaterial;

  })();

  angular.module('app').factory('ParticleZoomMaterial', [ParticleZoomMaterial]);

}).call(this);

(function() {
  var IntroPath;

  IntroPath = (function() {
    function IntroPath(GUI, Cameras, Scene) {
      var controller, dolly, folder, path, setup, updateCameraPosition, updatePoints;
      controller = {
        percent: 0
      };
      path = null;
      folder = GUI.addFolder('intro path');
      dolly = null;
      setup = function(points) {
        dolly = new THREE.CameraDolly(Cameras.user, Scene, points, folder);
        folder.add(controller, 'percent', 0, 1).onChange(function() {
          dolly.cameraPosition = controller.percent;
          dolly.lookatPosition = controller.percent;
          return dolly.update();
        });
        return folder.add(dolly, 'exportPositions');
      };
      updatePoints = function(points) {
        if (dolly != null) {
          return dolly.updateCameraPoints(points);
        }
      };
      updateCameraPosition = function(percent) {
        dolly.cameraPosition = percent;
        dolly.lookatPosition = percent;
        return dolly.update();
      };
      return {
        setup: setup,
        path: path,
        updatePoints: updatePoints,
        updateCameraPosition: updateCameraPosition
      };
    }

    return IntroPath;

  })();

  angular.module('app').factory('IntroPath', ['GUI', 'Cameras', 'Scene', IntroPath]);

}).call(this);

(function() {
  var TowerPath;

  TowerPath = (function() {
    function TowerPath(GUI, Cameras, Scene) {
      var controller, dolly, folder, getPointOnCameraPath, path, setup, updateCameraPosition, updatePoints;
      controller = {
        percent: 0.1
      };
      path = null;
      folder = GUI.addFolder('tower path');
      folder.open();
      dolly = null;
      setup = function(points, towerPathPoints) {

        /*
        			use points based off the tower shape instead of the json
         */
        points.camera = towerPathPoints;
        dolly = new THREE.CameraDolly(Cameras.user, Scene, points, folder, true);
        folder.add(controller, 'percent', 0, 1).onChange(function() {
          dolly.cameraPosition = controller.percent;
          dolly.lookatPosition = controller.percent;
          return dolly.update();
        });
        return folder.add(dolly, 'exportPositions');
      };
      updatePoints = function(points) {
        if (dolly != null) {
          return dolly.updateCameraPoints(points);
        }
      };
      updateCameraPosition = function(percent) {
        percent = THREE.Math.clamp(percent, 0, 1);
        dolly.cameraPosition = percent;
        dolly.lookatPosition = percent;
        return dolly.update();
      };
      getPointOnCameraPath = function(percent) {
        return dolly.getPointOnCameraPath(percent);
      };
      return {
        setup: setup,
        updatePoints: updatePoints,
        updateCameraPosition: updateCameraPosition,
        getPointOnCameraPath: getPointOnCameraPath
      };
    }

    return TowerPath;

  })();

  angular.module('app').factory('TowerPath', ['GUI', 'Cameras', 'Scene', TowerPath]);

}).call(this);
