// Tutorial 12 - Provider-and-connect.js

// This file is the entry point of our JS bundle. It's here that we'll create our Redux store,
// instantiate our React Application root component and attach it to the DOM.

import React from 'react'
import { render } from 'react-dom'
// All store creation specific code is located in ./create-store.js
import createStore from './create-store'
// Application is the root component of our application and the one that holds Redux's Provider...
import Application from './application'
import {box,update,sub,normalize,applyForce,looper} from './particle.js'

// Just as we did so many times in previous examples, we need to create our redux instance. This time
// all code for that task was moved to a specific module that returns a single function to trigger the
// instantiation.
const store = createStore()

var that=this;
document.onmousemove = function(e) {

  e = e || window.event

  var mouseMoveCreator = function (name,date) {
    return {
      type: 'MOUSE_MOVE',
      date: date,
      value_y: e.pageY,
      value_x: e.pageX
    }
  }
  store.dispatch(mouseMoveCreator('bob',new Date() ))

}

document.onmouseleave = function(e) {

  e = e || window.event

  var mouseMoveCreator = function (name,date) {
    return {
      type: 'MOUSE_OUT',
      date: date,
      value_y: e.pageY,
      value_x: e.pageX
    }
  }
  store.dispatch(mouseMoveCreator('bob',new Date() ))

}


document.onmousedown = function(e) {

  e = e || window.event

  var mouseDownCreator = function (name,date) {
    return {
      type: 'MOUSE_DOWN',
      id: name,
      date: date,
      value_y: e.pageY,
      value_x: e.pageX
    }
  }
  store.dispatch(mouseDownCreator('bob',new Date() ))

}

document.onmouseup = function(e) {

  e = e || window.event

  var mouseUpCreator = function (name,date) {
    return {
      type: 'MOUSE_UP',
      id: name,
      date: date,
      value_y: e.pageY,
      value_x: e.pageX
    }
  }
  store.dispatch(mouseUpCreator('bob',new Date() ))

}


let particles = Array(46).fill(true).map(_ => box())

// painting loop
const WORLD_FRICTION = .77

looper(() => {
  particles = particles.map((p,i) =>{
    return  update(p, WORLD_FRICTION)})
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
    let dir = sub([store.getState().mouseReducer.mousex[0].pos,store.getState().mouseReducer.mousey], p.position)
    // normalize it (make the unit length 1)
    dir = normalize(dir)
    // apply movement to the particle in the direction of the mouse
    return applyForce(p, p.mass, dir) //<-- use the mass
  })
})()



//
setInterval(t => {
  // console.log(particles);
  //store.dispatch( {type:'Mouse', particule: particles})
  //console.log(mouse);
    store.dispatch( {type:'PARTICLES', particule: particles})
}, 110)


// Now, time to render our application to the DOM using ReactDOM.render (or just render thanks to
// the ES6 notation: import { render } from 'react-dom')...
render(
  // ... and to provide our Redux store to our Root component as a prop so that Redux
  // Provider can do its job.
  <Application store={store} />,
  document.getElementById('app-wrapper')
)

// Go to ./create-store.js to review what you know now perfectly: "How to create a Redux store?"
