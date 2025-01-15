# R3F Workshops - Environment and Staging

- Bootstraped with:

```
pnpm create vite
```

- dependancies

```
pnpm add three @react-three/fiber @react-three/drei leva@0.9.34
```

```
pnpm add -D r3f-perf @types/three
```

# Leva @0.9.34 worked for me

latest version has bug I think, unable to use joystick and color picker

---

---

# Part one

---

---

## Background color

With

- css
- setClearColor (look inside inside src/App.tsx)
- background (look inside inside src/App.tsx)
- R3F color (`<color>` tag inside Canvas) (look inside inside src/App.tsx (can be nested also in Experiance.tsx))

## Lights

![lights](/notes/images/Screenshot%20from%202025-01-13%2010-56-32.png)

- Light Helpers

`useHelper` hook from drei

## Shadows

- activation (shadows attribute on canvas) (boolean but it has other values too)

- make sure to set `castShadow` on directional light

- make sure to set castShadow attribute on meshes you want to cast shadow, and set receiveShadow attribute on the floor mesh

### Baking

we are not talking about blender, we are talking about real time

for example if element doesn't roate or move, you can bake shadow

Well you can do this with drai too

use helper `BakeShadows`

### Configuring shadows

see what shadow map settings I made on directional light

#### soft shadows

see the example where when a shadow near a floor is sharp but it gets blurry when element goes away from floor

<https://threejs.org/examples/?q=pcss#webgl_shadowmap_pcss>

We accomplish this with `SoftShadows` helper

Don't animate the properties, don't allow user to change them, it's bad for performance

#### accumulative shadows

`AccumulativeShadows`

can be rendered only on plane (we used our floor)

since this is specail thing we must remove `receiveShadow` from floor mesh

we set it before the lights

we position it to be just little above the floor (0.1 above the floor (by `y`))

And we need to add new light, and that light needs to be nested inside it, in our case directional light, and we will use position and castShadow, the properties which outr existing light already has

So we have two lights, one nested and other outside, and both needs to be positioned with same values and both needs to have castShadow to true

We will also use helper `RandomizedLight` and we will replace nested directional light with it

And now tweak bunch of properties on randomized light

leva will be usefull here because this is hard to set

---

---

# Part two

---

---

That is why we separated our Experience and App in two different folders

### `ContactShadows`

It only works without light, and only on a plane

this one doesn't relly on default shadow system of Three.js

We need to deactivate `shadows` on `<Canvas>`

we will put it on the floor ant it will render from the floor

nest it where ever you want

cool thing to add to leva, are opacity, blur and color, so you can find perfect match for your scene

We installed leva 0.9.0

limitations:

![csh](/notes/images/Screenshot%20from%202025-01-14%2004-46-25.png)

# Sky

I imported it from drei and nested it

it tries to reproduce realistic sky

we will just move sun position with leva

play with the y, this will put sun up or down

but what is better to do

- create Spherica (<https://threejs.org/docs/index.html?q=Spherical#api/en/math/Spherical>)
- create Vector3 (convert sperical to)
- use method setFromSpherical (on Vector3)

Also we can use same coordinates on directional light and for the sun position

---

---

# Part three

---

---

I wanted to separate environment map things in a separate lesson

# Environment Map

- remove Sky, and all lights for this lesson

we kept ContactShadows

We are using `Environment` helper

we are starting with cube texture, after that we will switch to hdri

env map will be responsible for light

### I think we have a problem

envMap needs to be set on every material of our meshes

there is a hook `useEnvironment`

so we are going to use useEnvironment (we are loading texture with help of this hook)

### Env map Intensity

set `envMapIntensity` to 1

we set this with leva also

we do it for the each material of each mesh we have

### We will also test some HDRI textur of the sky

I downloaded it from here: <https://polyhaven.com/a/the_sky_is_on_fire>

**In your rel world projects try to download as low resolution as possible, in case if you are not planing to use it as background, when you just want lighting settings that env map brings, and not the actual image**

### Environment component also has presets

drei creates presets. Files are taken directly from Poly Heaven

for example you can use `preset="sunset"`

You don't need to download any files by yourself. Just use presets

**We pick same preset for useEnvironment hook and for Environment element**

---

---

# Part 4

---

---

# Custom environment (we are using our own mesh as a map)

Tweaking a little

We want to add red rectangle on the side to ensure there's a red light luminating to our objects from the side

**We nest the new mesh inside the Environment tag, and now it will be part of the map**

Idea is that red rectangle emmits light on your mesh and that it looks redish because of that

**But there is a problem** since we set map property on all of our meshes, you won't see the red light so remove the `map`, maybe from the cube, after you did this you'll see that as one side of the box will be redish, the side that is pointing to the red plane

Problem is now that you can't set the envMapIntensity on the box (Didn't find solution for this)

You can remove preset prop (from your Environment element) and you will see increased redish tone on all of your meshes for whoom you didn't set `map`, which is just a cube

## color tag nested in the `Environment`

this will change background property of the scene, so you must use `attach="background"`

now on the side of the scene that is accross red plane will be in the color you provided and red plaane will emmit red so you will have interesting effect

also we will set color on the plane nested in Environment and we will use vector for that: array with three numbers

set red to 10, you will see like more elumination on your meshes that caome from the plane

### Using `Lightformer`

Comment out mesh that is inside Environment tag, keep color tag

now there is no light in the scene, not any preset env map or other env map, we just kept env map on the plane for no special reasons

and we are going to nest Lightformer inside Environment

play with the props, geometry can be ring, can be rect, circle, set color, intesity and other things

It will look better if you would use scene with a reflection

Here is the example: <https://codesandbox.io/p/sandbox/lwo219> (but I don't think it's working)

You can try putting preset back now and try it how it looks

**Looks very nice**

### We can lower the resolution for performances sake, especially when you don't need to see background

and haide background, maybe we can set resolution to 32

it looks cool, yes you see large rectangles but it looks great

you can hide background

Yes, it looks good

---

---

Part 5

---

---

# `ground` prop of Environment

You need to find environment map that has a flat in the middle. Anything with walls will look strange

I used this one: <https://polyhaven.com/a/hochsal_field>

remove or comment resolution prop we set on Environment

comment out Lightformer nested in Environment

This feature is very cool

When we use envMap as background, image is infinitely far, and we have a feeling like our objects are floating

By adding a `ground` attribute, the projection of the environment map will make it look as if the floor underneath the objects is near

**There is a problem and I think it is a three version problem or r3f version problem,. You need to input specific values in order this to work**

For me only work with this values:

```tsx
ground={{ height: 5, radius: 40, scale: 20 }}
```

It would be good to use leva for setting these values

We also need to place out meshes at 0 elevation in our scene
