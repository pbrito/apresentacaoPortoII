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
                      pagina:"paginaA"
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
              return {
                ...state,
                pagina: action.pagina,
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
  {  paginaA:{
    content:[
      {
        background : 'http://localhost:5984/geoj/zombie_img/05.png',
        backgroundColor: 0xff80ac,
        menu:
        [
          {
            type:"Butao",
            nome:"a",
            y:200,
            x:267
          },
          {
            type:"Butao",
            nome:"b",
            y:250,
            x:336,
            paginaDestino:"paginaB",
            subMenu:[
              {nome:"ioio"},
              {nome:"jyed"},
            ]
          },
          {
            type:"Butao",
            nome:"c",
            y:300,
            x:410
          },
          {
            type:"Butao",
            nome:1,
            y:450,
            x:476
          }
        ]
      }
    ]},
    paginaB:{
     content:[
       {
         background:'http://127.0.0.1:5984/geoj/dados_img/PNG_transparency_demonstration_1.png',
         backgroundColor: 0x6ad6b2,// 0xdddddd 0x51225e 0xc6e2ff 0x3f88c5 0xf6f7eb

         menu:
         [
           {
             type:"Butao",
             nome:"retorna A",
               paginaDestino:"paginaA",
             y:200,
             x:267
           },
           {
             type:"Butao",
             nome:"bfrf",
             y:250,
             x:336,
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
