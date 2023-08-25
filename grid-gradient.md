
## Getting mouse coordinates

Let’s take a brief aside into generating a grid background using CSS. We will be using this to try to better understand notions of clicking on an image as it is displayed versus its inherent size. So it will be helpful to have a 10 ✖️ 10 grid to work with.

`CSS` has gradient properties, `linear-gradient` and `radial-gradient`, that allow you to create gradients. These gradients can be used as backgrounds by using them as the values of the `background-image` property. Often they are used to make pretty gradual color gradients, like this:


<div class=gradient-demo>
  <pre style="background-image: linear-gradient(red,pink)">background-image: linear-gradient(red,pink)</pre>
  <pre style="background-image: radial-gradient(yellow, rebeccapurple)">background-image: radial-gradient(yellow, rebeccapurple)</pre>
</div>

<style>
.gradient-demo {
  display:flex;
  gap:1em;
  height:5rem;
}
.gradient-demo pre {
  flex:1;
  font-size:small;
  padding:1em;
  white-space: pre-wrap;;
}
</style>

You can also use gradients to make a grid. The trick is to use a gradient that is a single pixel wide. Then you can use the `background-size` property to make the gradient repeat. For example, if we make a gradient that is a single pixel wide and 10 pixels tall, we can use `background-size: 10px 10px` to make the gradient repeat 10 times in both the horizontal and vertical directions.

The part of the gradient definition that makes it one pixel wide is 

<div class=gradient-demo>
  <pre style="background-image: linear-gradient(#dfdfdf 1px,transparent 1px),linear-gradient(to right, #dfdfdf 1px,transparent 1px);background-size: 100px 10px">background-image: linear-gradient(red,pink);background-size: 10px 10px</pre>
</div>

