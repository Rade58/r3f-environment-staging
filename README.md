# R3F Workshops - Environment and Staging

- Bootstraped with:

```
pnpm create vite
```

- dependancies

```
pnpm add three @react-three/fiber @react-three/drei
```

```
pnpm add -D r3f-perf @types/three
```

# Things we did or we talked about

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
