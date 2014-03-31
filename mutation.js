var jaia = (function() {
  var body = document.body;

  var MutationObserver = window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        classChanged(m);
      }
      else if (m.type === 'attributes' && m.attributeName === 'style') {
        styleChanged(m);
      }

      if (m.type === 'childList' && m.addedNodes.length > 0) {
        nodesAdded(m);
      }

      if (m.type === 'childList' && m.removedNodes.length > 0) {
        nodesRemoved(m);
      }
    });
  });

  function classChanged(ev) {
    var cl = [].slice.call(ev.target.classList);
    var old = ev.oldValue ? ev.oldValue.split(' ') : [];

    var added = cl.filter(function(c) {
      return old.indexOf(c) === -1;
    });
    var removed = old.filter(function(c) {
      return cl.indexOf(c) === -1;
    });

    if (added.length) {
      console.log("Class '" + added.join(', ') + "' added", ev.target);
    }
    if (removed.length) {
      console.log("Class '" + removed.join(', ') + "' removed", ev.target);
    }
  }

  function styleChanged(ev) {
    var parse = function(s) {
      return s.split(';').filter(function(s) {
        return s.trim() !== '';
      }).reduce(function(obj, style) {
        style = style.split(':').map(function(a) { return a.trim(); });
        obj[style[0]] = style[1];
        return obj;
      }, {});
    };

    var now = parse(ev.target.getAttribute('style'));
    var old = parse(ev.oldValue || '');

    var added = Object.keys(now).filter(function(k) {
      return !old[k];
    });
    var removed = Object.keys(old).filter(function(k) {
      return !now[k];
    });
    var changed = Object.keys(now).filter(function(k) {
      return now[k] !== old[k];
    });

    added.forEach(function(k) {
      console.log("Style added '" + k + ': ' + now[k] + "'", ev.target);
    });
    removed.forEach(function(k) {
      console.log("Style removed '" + k + ': ' + old[k] + "'", ev.target);
    });
    changed.forEach(function(k) {
      if (old[k] === undefined) return;

      console.log("Style change '" + k + "', newValue '" + now[k] + "', was '" + old[k] + "'", ev.target);
    });
  }

  function nodesAdded(ev) {
    [].forEach.call(ev.addedNodes, function(n) {
      console.log('Node added', n, 'as child of', ev.target);
    });
  }

  function nodesRemoved(ev) {
    [].forEach.call(ev.removedNodes, function(n) {
      console.log('Node removed', n, 'as child of', ev.target);
    });
  }

  return {
    start: function() {
      observer.observe(body, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true
      });
    },
    stop: function() {
      observer.disconnect();
    }
  };
}());



// Some test code...
// document.body.appendChild(document.createElement('div'));
// document.body.classList.toggle('landscape');
// document.body.querySelector('div').classList.toggle('yolo');
// document.body.querySelector('div').setAttribute('tra', 'zus');
// document.body.querySelector('div').style.width = '400px';
// document.body.querySelector('div').style.width = '350px';
// document.body.querySelector('div').style.width = 'inherit';
