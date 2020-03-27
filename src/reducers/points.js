import {
    POINT_ADDED,
    POINTS_LOADED,
    POINTS_RECALCULATED,
    UPDATE_FIELD_POINT,
    UPDATE_WITH_MESSAGE
} from '../constants/actionTypes';

export default (state={'rc':1, 'yc':0, 'xc':0}, action) => { //added default radius and y
    switch (action.type) {
        case UPDATE_FIELD_POINT: {
            var message = '';
            if ((action.key=='xc' && (parseFloat(action.value) <= -5 || parseFloat(action.value) >= 5 || !(!isNaN( Number(action.value) ) && String(action.value).lastIndexOf('.') != (action.value.length - 1))))
                || ((parseFloat(state.xc) <= -5 || parseFloat(state.xc) >=5 || !(!isNaN( Number(state.xc) ) && String(state.xc).lastIndexOf('.') != (state.xc.length - 1))) && action.key!='xc')) {
                //alert('action.key + action.value' + action.key + ' ' + action.value);
                //alert('state.xc ' + state.sc);
                message += 'X нехороший';
            }
            if ((action.key=='yc' && (parseFloat(action.value) <= -5 || parseFloat(action.value) >= 5 || !(!isNaN( Number(action.value) ) && String(action.value).lastIndexOf('.') != (action.value.length - 1))))
                || ((parseFloat(state.yc) <= -5 || parseFloat(state.yc) >=5 || !(!isNaN( Number(state.yc) ) && String(state.yc).lastIndexOf('.') != (state.yc.length - 1))) && action.key!='yc')) {
                //alert('action.key + action.value' + action.key + ' ' + action.value);
                //alert('state.yc ' + state.yc);
                message += 'Y нехороший';
            }
            if ((action.key=='rc' && (parseFloat(action.value) <= 0 || parseFloat(action.value) >=5 ) ) || (parseFloat(state.rc) <= 0 && action.key!='rc')) {
                //alert(action.key + ' ' + action.value);
                message += 'Я такие извращения не рисую'
                if (action.key=='rc') {
                    action.value = 0;
                }
            }
            return { ...state, [action.key]: action.value, message };
        }
        case UPDATE_WITH_MESSAGE:
            return {
                ...state,
                message: action.message,
                [action.key]: action.value
            }
        case POINT_ADDED:
            return {
                ...state,
                point: action.payload
            };
        case POINTS_LOADED:
            return {
                ...state,
                points: action.payload,
            };
        case POINTS_RECALCULATED:
            return {
                ...state,
                points_r: action.payload,
                current_r: action.r
            };
        default:
            return state;
    }
};

