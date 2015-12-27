// Tutorial 12 - Provider-and-connect.js

// This file is the entry point of our JS bundle. It's here that we'll create our Redux store,
// instantiate our React Application root component and attach it to the DOM.

import React from 'react'
import { render } from 'react-dom'
// All store creation specific code is located in ./create-store.js
import createStore from './create-store'
// Application is the root component of our application and the one that holds Redux's Provider...
import Application from './application'

// Just as we did so many times in previous examples, we need to create our redux instance. This time
// all code for that task was moved to a specific module that returns a single function to trigger the
// instantiation.
const store = createStore()

var that=this;
document.onmousemove = function(e) {

  e = e || window.event

  var mouseMoveCreator = function (name) {
    return {
      type: 'MOUSE_MOVE',
      value_y: e.pageY,
      value_x: e.pageX
    }
  }
  store.dispatch(mouseMoveCreator('bob'))

}

document.onmousedown = function(e) {

  e = e || window.event

  var mouseDownCreator = function (name) {
    return {
      type: 'MOUSE_DOWN',
      id: name,
      value_y: e.pageY,
      value_x: e.pageX
    }
  }
  store.dispatch(mouseDownCreator('bob'))

}

document.onmouseup = function(e) {

  e = e || window.event

  var mouseUpCreator = function (name) {
    return {
      type: 'MOUSE_UP',
      id: name,
      value_y: e.pageY,
      value_x: e.pageX
    }
  }
  store.dispatch(mouseUpCreator('bob'))

}



    const logEm = (a) =>
        a.map( ({position}) => `
          x: ${position[0]}
          y: ${position[1]}
          -----------`).join('')

    const random = (min=0, max=400) =>
        Math.random()*(max-min)+min

    const vector = (x=random(),y=random()) => [x,y]

    const degToRad = deg => deg * Math.PI / 180

    const radToDeg = rad => rad*180 / Math.PI

    const add = (...vx) =>
        vx.reduce((a, v) =>
            [a[0] + v[0], a[1] + v[1]], [0,0])

    const sub = (...vx) =>
        vx.reduce((a, v) =>
            [a[0] - v[0], a[1] - v[1]])

    const scale = ([x,y],n) =>
        [n * x, n * y]

    const dot = ([x1,y1],[x2,y2]) =>
        x1*x2 + y1*y2

    const rotate = ([x,y],deg) => {
        let r = degToRad(deg),
            [cos, sin] = [Math.cos(r), Math.sin(r)]
        return [cos*x - sin*y, sin*x + cos*y]
    }

    const normalize = v => scale(v,1/(mag(v) || 1))

    const mag = ([x,y]) => Math.sqrt(x*x + y*y)

    const dist = ([x1,y1], [x2,y2]) =>
        Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2))

    const heading = (v) => {
        let angle = angleBetween(v,[0,-1*mag(v)])
        return v[0] < 0 ? 360-angle : angle
    }

    const angleBetween = (v1,v2) =>
        radToDeg(Math.acos( dot(v1,v2) / (mag(v1)*mag(v2)) ))

    const particle = (
      position=vector(),
      velocity=vector(),
      accel=vector()
    ) => {
        return {accel, velocity, position}
    }


// GIVE ME THE JUICE!
//
// update, now with more acceleration.
//
// velocity += accel_______
// velocity *= 1-friction _|---> part a
// position += velocity--------> part b

const update = (p, friction) => {
    let [[px,py], [vx,vy], [ax,ay]] = [p.position, p.velocity, p.accel]
    vx = (vx+ax) * (1-friction)
    vy = (vy+ay) * (1-friction)
    let position = [px + vx, py + vy],
        accel = [0,0],
        velocity = [vx,vy]
    return { ...p, position, accel, velocity }
}

// force = m*a
const applyForce = (p, m, a) => {
    let {accel} = p
    accel = add(accel, scale(a,m))
    return { ...p, accel }
}


const looper = fn => {
    let cb = (time) => {
        requestAnimationFrame(cb)
        let diff = ~~(time - (cb.time || 0)),
            seconds_passed = diff/1000
        fn(seconds_passed)
        cb.time = time
    }
    return cb
}




const box = (mass=random(1,50)) => {
    return {...particle(), mass }
}

let particles = Array( 70)
.fill(true)
 .map(_ => box())

// painting loop
const WORLD_FRICTION = .73

looper(() => {
    particles = particles.map(p => update(p, WORLD_FRICTION))

      store.dispatch( {type:'PARTICLES', particule: particles})
})()


// the mouse

let mouse = [0,0],
    mouse_step = 0,
    corners = [[100,100], [400,100], [400,400], [100,400]]

// every 5 seconds, the mouse goes to a new corner
// setInterval(() => {
//   //  mouse_step = mouse_step === corners.length-1 ? 0 : mouse_step+1
//   //  var uistate=this.props.reduxState.mouseReducer
//
//     mouse = [store.getState().mouseReducer.mousex,store.getState().mouseReducer.mousey]
// }, 200)


// chase the mouse by continually applying/adjusting force to each particle
looper(() => {
    particles = particles.map(p => {
        // find directional difference b/w mouse and this particle
        let dir = sub([store.getState().mouseReducer.mousex,store.getState().mouseReducer.mousey], p.position)
        // normalize it (make the unit length 1)
        dir = normalize(dir)
        // apply movement to the particle in the direction of the mouse
        return applyForce(p, p.mass, dir) //<-- use the mass
    })
})()



//
// setInterval(t => {
//   // console.log(particles);
//   //store.dispatch( {type:'Mouse', particule: particles})
//   //console.log(mouse);
//     store.dispatch( {type:'PARTICLES', particule: particles})
// }, 110)


// Now, time to render our application to the DOM using ReactDOM.render (or just render thanks to
// the ES6 notation: import { render } from 'react-dom')...
render(
  // ... and to provide our Redux store to our Root component as a prop so that Redux
  // Provider can do its job.
  <Application store={store} />,
  document.getElementById('app-wrapper')
)

// Go to ./create-store.js to review what you know now perfectly: "How to create a Redux store?"
