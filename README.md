# formatMoney

Convert numbers to desired currency format.
Javascript ES5

## Usage
Can be called in the input blur event. Development required for keyup event to work.
```js
inputElement.addEventListener('blur', function(){
  this.value = formatMoney(this.value);
  // this.value = formatMoney(this.value, 2, ',', '.');
});
```
