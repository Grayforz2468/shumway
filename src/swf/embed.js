SWF.embed = function(file, container, options) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('kanvas-2d');
  var loader = new Loader;
  var loaderInfo = loader.contentLoaderInfo;
  var stage = new Stage;

  loader._stage = stage;
  stage._loader = loader;

  function fitCanvas(container, canvas) {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }

  loaderInfo.addEventListener(Event.INIT, function () {
    stage._frameRate = loaderInfo.frameRate;
    stage._loaderInfo = loaderInfo;
    stage._stageHeight = loaderInfo.height;
    stage._stageWidth = loaderInfo.width;

    if (container.clientHeight) {
      fitCanvas(container, canvas);
      window.addEventListener('resize', function () {
        fitCanvas.bind(container, canvas);
      });
    } else {
      canvas.width = stage.stageWidth;
      canvas.height = stage.stageHeight;
    }

    container.setAttribute("style", "position: relative");

    canvas.addEventListener('click', function () {
      Keyboard.focus = stage;
    });
    canvas.addEventListener('mousemove', function (domEvt) {
      stage._mouseX = domEvt.pageX - this.offsetLeft;
      stage._mouseY = domEvt.pageY - this.offsetTop;
    });

    var bgcolor = loaderInfo.backgroundColor;
    stage._color = bgcolor;
    canvas.style.background = toStringRgba(bgcolor);

    // Dirty hack for now.
    //stage.addChild(loader.content);
    stage._children[0] = loader.content;
    container.appendChild(canvas);
    renderStage(stage, ctx);
  });

  if (options.onComplete) {
    loaderInfo.addEventListener(Event.COMPLETE, function () {
      options.onComplete();
    });
  }

  loader.loadFrom(file);
};
