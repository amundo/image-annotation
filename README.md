---
title: Building an image annotation Web Component
author: Patrick Hall
---

## Introduction

I have found many contexts in which it would be useful to add annotations to images. For example, I am interested in writing systems for various reasons, and I often need to add annotations to images of text. I am also interested in building Web Components, and I thought it would be fun to build a Web Component that allows users to add annotations to images. This post describes the workflow I used to build the Web Component and the Web Component itself.

## The workflow

The workflow I have in mind for users is as follows:

1. The user selects an image to annotate.
2. The user selects a tool to use for annotation.
3. The user uses the tool to annotate the image.
4. The user saves the annotations.


## Challenges

Probably the most difficult part of this project (in my estimation, after having made various prototypes) is managing issues to do with image scaling. Typically, annotating an image isn’t worth the effort with a low-resolution image of small dimensions. But with a large image, the user will need to zoom in and out to annotate different parts of the image. This means that selections for annotations will also have to scale. I have started looking into this spacing using `<canvas>`, but the problem with that is that selections are just pixels, and so they don’t scale with the image. I think a better solution is to use `<svg>`, so that the selections are `<rect>` elements. (Additionally, in the future it would be possible to support polygons. <https://geojson.io> is an inspiration for me here.)

## The Web Component

The basic user interface I have in mind looks like this:

[basic-interface.html](basic-interface.html)

<iframe src="basic-interface.html" width="100%" height="300px"></iframe>

Fugly, I know. The point right now is just to figure out what elements are necessary. To be honest I could probably dispense with the toolbar, but one must dream.

### Bearable styling

Because god.

Until we get to building out the component, I’ll keep working directly in the `<body>` tag as the top level. 

[bearable-styling.html](bearable-styling.html)

<iframe src="bearable-styling.html" width="100%" height="300px"></iframe>

Building things always makes you realize what’s obvious: we’re missing some kind of pane to see and edit annotations. But we don’t have any yet anyway, so we’ll come back to this. Let’s start with task one: loading an image.

### Loading an image

The basic idea here is: when the user selects an image, add it to the `<svg>`. 

We’re going to want the image to be _in_ the `<svg>` as opposed to a background image or something, because we’re going to need to zoom things. That means using the `<image>` tag.

So try loading [mereri.jpg](mereri.jpg) using the interface below:

[load-image.html](load-image.html)

<iframe src="load-image.html" width="100%" height="300px"></iframe>


This doesn’t do much, it just alerts the file name when we load it. But at least we know loading is happening. 

Now, we need to actually load the image into the `<svg>`. Our strategy will be to insert the file object into the DOM at the `href` of the  `<image>` element. This isn’t _too_ bad. The `.files` property of the `<input type=files>` is a [File object](https://developer.mozilla.org/en-US/docs/Web/API/File), which means that is a subtype of a `Blob`. And a blob, in case you are unfamiliar, is just some undifferentiated data stored by the browser and given an URL. So we don’t even need to use anything like `URL.createObjectURL()`, because the file already _has_ a URL. In fact, if we pass a reference to our file object when we are creating the `<image>` tag’s `HTML`, the browser will put a blob URL in place and it will work. 

```js
export let loadImage = async changeEvent => {
  let image = changeEvent.target.files[0]
  let request = new Response(image)
  let blob = await request.blob()

  let imageHTML = `<image id=svg-image x="0" y="0" />`
  document.querySelector('svg').insertAdjacentHTML('beforeend', imageHTML)

  document.querySelector('#svg-image').setAttribute('href', URL.createObjectURL(blob))
}

document.querySelector('input[type=file]')
  .addEventListener('change', changeEvent => loadImage(changeEvent))
```


[load-image-2.html](load-image-2.html)

<iframe src="load-image-2.html" width="100%" height="300px"></iframe>

As you can see, we have a problem. By way of explanation, here’s the sample image we’re using (I’ve put an explicit `width` on it here, it’s actually [bigger](mereri.jpg)):

<img src=mereri.jpg width=500>

But this is not a  “data” problem — the image has been loaded correctly. As you can see below, the `href` attribute of the `<image>` tag is set to contain a blob URL:

```xml
<image id="svg-image" x="0" y="0" href="blob:http://localhost:1111/cfe75b6a-887d-4d1a-81bb-c3a65ac28461"></image>
```

### Fitting the image into the SVG

So, how do we make things fit? 

The first thing to do is to make sure that the `<svg>` is the same size as the image. We can do this by setting the `width` and `height` attributes of the `<svg>` to the `naturalWidth` and `naturalHeight` of the image. 

```js
cd = 

Oh boy, the wide world of viewports. This stuff will drive you bonkers. The best resources I know are:

- <https://www.sarasoueidan.com/blog/svg-coordinate-systems/>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts>
