export function makeProductItemJq($template, product){
        $template.find('.product-menu').attr('productId', product["id"]);
        $template.find('.product-name').text(product.name);
        $template.find('img').attr('src', product.picture);
        $template.find('.product-price').text(product["price"]);
        $template.find('.product-description').text( product["description"]);
        return $template;
}

export function makeProductItem($template, product){
    const keys = Object.keys(product);
    keys.forEach(function(key) {
        let selector = '.product-'+ key;
        switch(key){
            case 'id':
                $template.find(selector).attr('productId', product[key]);
                break;
            case 'picture':
                $template.find(selector).attr('src', product[key]);
                break;
            default:
                $template.find(selector).text(product[key]);
        }
    });
    return $template;
}

export function createProduct(){
    var article = document.createElement("article");
    var div = document.createElement("div");
    var p = document.createElement("p");
    p.textContent = "Very Nice Cat";
    div.appendChild(p);
    article.setAttribute('class', "grid-item");

    article.appendChild(div);
    document.querySelector('.grid-layout').appendChild(article);
}

/*
// Get an element.
var elem = document.getElementById('huge-ass-table');

// Just detach element from the DOM.
detach(elem);

// Detach + exec fn + reattach, synchronous.
detach(elem, function() {
  // this == elem, do stuff here.
});

// Detach + exec fn + reattach, asynchronous.
detach(elem, true, function(reattach) {
  // this == elem, do stuff here, call reattach() when done!
  setTimeout(reattach, 1000);
});
*/
export function detach(node, async, fn) {
    var parent = node.parentNode;
    var next = node.nextSibling;
    // No parent node? Abort!
    if (!parent) { return; }
    // Detach node from DOM.
    parent.removeChild(node);
    // Handle case where optional `async` argument is omitted.
    if (typeof async !== "boolean") {
      fn = async;
      async = false;
    }
    // Note that if a function wasn't passed, the node won't be re-attached!
    if (fn && async) {
      // If async == true, reattach must be called manually.
      fn.call(node, reattach);
    } else if (fn) {
      // If async != true, reattach will happen automatically.
      fn.call(node);
      reattach();
    }
    // Re-attach node to DOM.
    function reattach() {
      parent.insertBefore(node, next);
    }
  }


  // live listener function
(function(window) {

  // Element.matches "polyfill"
  (function(e){
    if (typeof e.matches !== "function") {
      e.matches = e.webkitMatchesSelector ||
                  e.mozMatchesSelector    ||
                  e.msMatchesSelector     ||
                  e.oMatchesSelector      ||
                  e.matchesSelector;
    }
  })(Element.prototype);

  function on(selector, eventType, handler) {
    // add listener for all existing elements
    [].forEach.call(document.querySelectorAll(selector), function(elem) {
      elem.addEventListener(eventType, handler);
    });

    // create new "live" observer
    var observer = new MutationObserver(function(records) {
      records.forEach(function(record) {
        [].forEach.call(record.addedNodes || [], function(elem) {
          if (elem.matches(selector)) {
            elem.addEventListener(eventType, handler);
          }
        });
      });
    });

    // watch for DOM changes to body's children and body's subtree
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return observer;
  }

  window.on = on;
})(window);
