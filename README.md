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

# What we did in this workshop

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

#### Whith this we end up firt half of the lesson

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

# We are starting with third par of the lesson here

I wanted to separate environment map things in a separate lesson

# Environment Map
