// Tutorial 12 - Provider-and-connect.js

// This file holds the one and only reducer of our application. Its behavior is nothing new to you
// except maybe its handling of three aspects of an action (GET_TIME) that become 3 dedicated actions...
// This approach allows us to do some nice real time updates in our UI like this:
// 1) When we receive GET_TIME_REQUEST action, we modify the state to say that some part of the
//    UI should be frozen (because there is a pending operation)
// 2) When we receive GET_TIME_SUCCESS (or GET_TIME_FAILURE) later on, we modify the state to
//    unfreeze our application and to add the new data we received.

var initialTimeState = {}

// The reducer is named with leading "_" to avoid having: state.time.time (time twice) when reading
// from state. So it's just a personal preference here and you may not need this depending on
// how your reducers are named and what properties they expose in Redux's store.
export function _time(state = initialTimeState, action) {
  switch (action.type) {
    case 'GET_TIME_REQUEST':
      return {
        ...state,
        frozen: true
      }
    case 'GET_TIME_SUCCESS':
      return {
        ...state,
        time: action.result.time,
        frozen: false
      }
    case 'GET_TIME_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        frozen: false
      }
    default:
      return state
  }
}


export function mouseReducer(
                    state = {
                      mousex: [{pos:0,date:0},{pos:0,date:0}],
                      mousey:0,
                      //date=> dateClick
                      date:0,
                      transicoes:{
                        //type:  start:  ended:  duration: paginaStart: paginaEnd
                      },
                      pagina:"{}"
                    },
                    action) {
  //  console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {

      case 'START_TRANSICAO':

        return {
          ...state,
          date: state.date,
          transicoes:{
            type: action.transicaoType,
            start: action.start,
            ended :false,
            duration: 10,
            mouse:{
              x:action.x ,
              y:action.y
            },
            paginaStart:  action.paginaStart,
            paginaEnd: action.paginaEnd

          }
        }

        /*
        return {
          type: 'MOUSE_MOVE',
          date: date,
          value_y: e.pageY,
          value_x: e.pageX
        }
        */
          case 'MOUSE_MOVE':
            //let d1=state.mousex[0].date
            if(action.date-state.mousex[0].date > 70)
            return {
              ...state,
              date: state.date,
              mousex:[ {pos: action.value_x,date:action.date},state.mousex[0],state.mousex[1]],
              mousey: action.value_y
            }
            else {
              return state
            }
          case 'MOUSE_DOWN':
            return {
              ...state,
              date: action.date,
              mousedown: true,
              mouseup: false
            }
          case 'MOUSE_OUT':
              return {
                ...state,
                date: action.date,
                mousedown: false,
                mouseup: false
          }
            case 'MOUSE_UP':
            return {
              ...state,
              date: action.date,
              mousedown: false,
              mouseup: true
            }
            case 'HOT_ITEM':
            return {
              ...state,
              hotitem : action.id
            }
            case 'ACTIVE_ITEM':
            return {
              ...state,
              activeitem :action.id
            }
            case 'COLOR_CHANGE':
            return {
              ...state,
              color: action.color

            }
            case 'GO_TO_PAGE':
            let d1=new Date()
              return {
                ...state,
                pagina: {id:action.pagina,
                  time: d1
                }
              }
            default:
            return state;
    }
}


export function particReducer(state = [{position:[0,0],accel:0,velocity:0,mass:0}], action) {
  //console.log('userReducer was called with state', state, 'and action', action)

  switch (action.type) {
    case 'PARTICLES':
      return action.particule
    default:
      return state
  }
}
export function siteApp(state =
  {
    //start:"paginaA",
    paginaA:{
      content:[
      {
        background : 'http://localhost:5984/geoj/zombie_img/05.png',
        backgroundColor: 0xb6e589,
        text:{
          str: "We were certain of one principle, especially regarding computer programs with this extreme level of user sensitivity. It was a principle that the patterns people were actively rejecting.\
        \nProgram structure should reflect the interaction with a user. Greg Bryant about Christopher Alexander ",
          posx:340,
          posy:100
        },
        menu:
        [
          {
            type:"Butao",
            nome:"a",
            paginaDestino:"paginaA",
            y:50,
            x:267
          },
          {
            type:"Butao",
            nome:"b",
            y:50,
            x:336,
            paginaDestino:"paginaB",
            subMenu:[
              {nome:"ioio"},
              {nome:"jyed"},
            ]
          },
          {
            type:"Butao",
             paginaDestino:"paginaC",
            nome:"c",
            y:50,
            x:410
          },
          {
            type:"Butao",
             paginaDestino:"paginaD",
            nome:1,
            y:50,
            x:476
          }
        ]
      }
    ]},
    paginaC:{
     content:[
       {
         background:'http://localhost:5984/geoj/coffee_img/coffee-309981_960_720.png',
         backgroundColor: 0x3f88c5,// 0xdddddd 0x51225e 0xc6e2ff 0x3f88c5 0xf6f7eb
         text:{str:"If you’re targeting a web browser, the event loop is deeply built into browser’s execution model. There, the event loop will run the show, and you’ll use it as your game loop too. You’ll call something like requestAnimationFrame() \
         and it will call back into your code to keep the game running.",
         posx:30,
         posy:300
        },
         menu:
         [
           {
             type:"Butao",
             nome:"retorna A",
               paginaDestino:"paginaA",
             y:50,
             x:267
           },{
             type:"Butao",
             nome:"b",
             y:50,
             x:336,
             paginaDestino:"paginaB",
             subMenu:[
               {nome:"ioio"},
               {nome:"jyed"},
             ]
           },
           {
             type:"Butao",
             nome:"bfrf",
             paginaDestino:"paginaD",
             y:50,
             x:476,
             subMenu:[
               {nome:"ss"},
               {nome:"ff"},
             ]
           }
         ]
       }
     ]},
     paginaB:{
      content:[
        {
          background:'http://127.0.0.1:5984/geoj/dados_img/PNG_transparency_demonstration_1.png',
          backgroundColor: 0xffdeed,// 0xdddddd 0x51225e 0xc6e2ff 0x3f88c5 0xf6f7eb
          text:{str:"If you’re targeting a web browser, the event loop is deeply built into browser’s execution model. There, the event loop will run the show, and you’ll use it as your game loop too. You’ll call something like requestAnimationFrame() \
          and it will call back into your code to keep the game running.",
          posx:30,
          posy:300
         },
          menu:
          [
            {
              type:"Butao",
              nome:"retorna A",
                paginaDestino:"paginaA",
              y:50,
              x:267
            },{
              type:"Butao",
              nome:"b",
              y:50,
              x:336,
              paginaDestino:"paginaB",
              subMenu:[
                {nome:"ioio"},
                {nome:"jyed"},
              ]
            },
            {
              type:"Butao",
              nome:"bfrf",
              paginaDestino:"paginaC",
              y:50,
              x:436,
              subMenu:[
                {nome:"ss"},
                {nome:"ff"},
              ]
            }
          ]
        }
      ]},
      paginaD:{
       content:[
         {
           background:'http://localhost:5984/geoj/banana/banana-png-image.png',
           backgroundColor: 0x51225e,// 0xdddddd 0x51225e 0xc6e2ff 0x3f88c5 0xf6f7eb
           text:{str:"Rendering Improvements Over the few last months, the Atom team has been working hard to improve the editor performance and deliver you an even greater experience. Today, I am going to shed some light on a few techniques we used to speed up the rendering process.\
The whole rendering process has to be extremely fast: for performance-sensitive scenarios, such as scrolling, we strive to complete each frame in less than 16ms. To achieve such speed we adopted several performance optimizations, for example:\
Keep the DOM as small as possible by rendering only the visible lines.\
Use absolute coordinates for lines and apply a transform3d on the lines’ container to simulate scrolling.",
           posx:30,
           posy:300
          },
           menu:
           [
             {
               type:"Butao",
               nome:"retorna A",
                 paginaDestino:"paginaA",
               y:50,
               x:267
             },{
               type:"Butao",
               nome:"b",
               y:50,
               x:336,
               paginaDestino:"paginaB",
               subMenu:[
                 {nome:"ioio"},
                 {nome:"jyed"},
               ]
             },
             {
               type:"Butao",
               nome:"bfrf",
               paginaDestino:"paginaC",
               y:50,
               x:436,
               subMenu:[
                 {nome:"ss"},
                 {nome:"ff"},
               ]
             }
           ]
         }
       ]}



  }
                          , action) {
  switch (action.type) {
    default:
      return state
  }
}
