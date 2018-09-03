// import './../sass/styles.scss';
import './../sass/app.scss';
import 'bootstrap';
// import _ from 'lodash';
// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;
import { detach } from './lib';  

// $('.table-add').click(function () {
//     var $clone = $('#table').find('tr.hide').clone(true).removeClass('hide table-line');
//     $('#table').find('table').append($clone);
// });


function getConditionalCallback(selector, callback) {
        return function(e) {
            if(!e.target) return;
            if(!e.target.matches(selector)) return;
            callback.apply(this, arguments);
        };
    }

let addDynamicEventListener = function (rootElement, eventType, selector, callback) {
    rootElement.addEventListener(eventType, getConditionalCallback(selector, callback));
};



document.querySelector('.table-add').addEventListener('click', function() {
    let template = document.querySelector('#tr').content;
    template.querySelector('.cell').textContent = "Cell Content";
    template.querySelector('.cell').nextElementSibling.textContent="Next Cell Content";
    template.querySelector('tr').classList.remove('hide');
    document.querySelector('tbody').append(document.importNode(template, true));
    
});

addDynamicEventListener(document.body, 'click', '.table-remove', function (e) {
    console.log(e.target.parentNode.parentNode);
    detach(e.target.parentNode.parentNode);
});

// $('.table-remove').click(function () {
//     $(this).parents('tr').detach();
// });

$('.table-up').click(function () {
    var $row = $(this).parents('tr');
    if ($row.index() === 1) return; // Don't go above the header
    $row.prev().before($row.get(0));
  });
  
$('.table-down').click(function () {
    var $row = $(this).parents('tr');
    $row.next().after($row.get(0));
});
  