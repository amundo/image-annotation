

### `preserveAspectRatio`


Can we force our image to fit without setting specific pixel dimensions? Why yes, yes we can. We can use an `SVG` attribute called `preserveAspectRatio` on our `<image>` tag that will tell it to scale the image to fill up the available space (which is the size of its parent container, which is the `<svg>`, which is now getting its size from a `CSS` grid on `<main>`!). `preserveAspectRatio` takes a string value that is a combination of two things: a keyword that tells the browser how to scale the image, and a keyword that tells the browser where to position the image. The default value of `preserveAspectRatio` is `xMidYMid meet`, which means that the image will be scaled to fit the available space, and that the image will be centered in the available space. 

```xml
<svg style="border:1px solid" >
<image style="border:1px solid" x="0" y="0" href="mereri.jpg" preserveAspectRatio="xMidYMid meet"></image>
</svg>
```

```{=html}
<svg style="border:1px solid" height=100% width=100%;>
<image style="border:1px solid" height=100% width=100%;></image>
</svg>
```






### mystery stuff

Put simply, the `<svg>` tag and the image are not going to have the same dimensions, because this is an application, and point is to be able to use it with different images. So we need to be able to scale either the image or the `<svg>`. But once that is done, we also need to be able to zoom and pan the image, all while maintaining references to the original image’s dimensions.

The first thing we need to do is to get the dimensions of the image. We can do this by creating an `Image` object and then getting its `naturalWidth` and `naturalHeight` properties. 


[load-image-3.html](load-image-3.html)

<iframe src="load-image-3.html" width="100%" height="300px"></iframe>

<iframe src="mereri.jpg"></iframe>



### `viewBox`


The key thing that puts the “scalable” into “scalable vector graphics” is the `viewBox` attribute. As it happens, that attribute is not set by default. So let’s set it:

```xml
<svg>
<image style="border:1px solid" preserveAspectRatio="xMidYMid meet" id="svg-image" x="0" y="0" href="mereri.jpg"></image>
</svg>
```

```{=html}
<svg>
<image style="border:1px solid" preserveAspectRatio="xMidYMid meet" id="svg-image" x="0" y="0" href="mereri.jpg"></image>
</svg>
```


Here we’ve set the `viewBox` to be the same as the dimensions of the image. What if we divide those values in half?


```xml
<svg style="border:1px solid" viewBox="0 0 1000 750">
<image style="border:1px solid"  id="svg-image" x="0" y="0" href="mereri.jpg"></image>
</svg>
```

```{=html}
<svg viewBox="0 0 1000 750">
<image id="svg-image" x="0" y="0" href="mereri.jpg"></image>
</svg>
```

What? Well, the way to think about the `viewBox` is that it is the “window” through which we are looking at the image. So if we set the `viewBox` to be half the size of the image, we are looking at the image through a window that is half the size of the image.




## Resources

Oh boy, the wide world of viewports. This stuff will drive you bonkers. The best resources I know are:

- <https://www.sarasoueidan.com/blog/svg-coordinate-systems/>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts>
