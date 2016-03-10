

export const random = (min=0, max=400) =>
Math.random()*(max-min)+min


export const vector = (x=random(),y=random()) => [x,y]

export const degToRad = deg => deg * Math.PI / 180

export const radToDeg = rad => rad*180 / Math.PI

export const add = (...vx) =>
vx.reduce((a, v) =>
[a[0] + v[0], a[1] + v[1]], [0,0])

export const sub = (...vx) =>
vx.reduce((a, v) =>
[a[0] - v[0], a[1] - v[1]])

export const scale = ([x,y],n) =>
[n * x, n * y]

export const dot = ([x1,y1],[x2,y2]) =>
x1*x2 + y1*y2

export const rotate = ([x,y],deg) => {
  let r = degToRad(deg),
  [cos, sin] = [Math.cos(r), Math.sin(r)]
  return [cos*x - sin*y, sin*x + cos*y]
}

export const normalize = v => scale(v,1/(mag(v) || 1))

export const mag = ([x,y]) => Math.sqrt(x*x + y*y)

export const dist = ([x1,y1], [x2,y2]) =>
Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2))

export const heading = (v) => {
  let angle = angleBetween(v,[0,-1*mag(v)])
  return v[0] < 0 ? 360-angle : angle
}

export const angleBetween = (v1,v2) =>
radToDeg(Math.acos( dot(v1,v2) / (mag(v1)*mag(v2)) ))

export const particle = (
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

export const update = (p, friction) => {
  let [[px,py], [vx,vy], [ax,ay]] = [p.position, p.velocity, p.accel]
  vx = (vx+ax) * (1-friction)
  vy = (vy+ay) * (1-friction)
  let position = [px + vx, py + vy],
  accel = [0,0],
  velocity = [vx,vy]
  return { ...p, position, accel, velocity }
}

// force = m*a
export const applyForce = (p, m, a) => {
  let {accel} = p
  accel = add(accel, scale(a,m))
  return { ...p, accel }
}


export const looper = fn => {
  let cb = (time) => {
    requestAnimationFrame(cb)
    let diff = ~~(time - (cb.time || 0)),
    seconds_passed = diff/100
    fn(seconds_passed)
    cb.time = time
  }
  return cb
}




export const box = (mass=random(1,50)) => {
  return {...particle(), mass }
}
