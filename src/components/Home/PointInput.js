import React from 'react';
import ListErrors from '../ListErrors';
import agent from '../../agent';
import { connect } from 'react-redux';
import { POINT_ADDED, UPDATE_FIELD_POINT, UPDATE_WITH_MESSAGE } from "../../constants/actionTypes";
import { Select, TextInput, Option, Placeholder } from 'belle';

const mapStateToProps = state => ({ ...state.points });


const mapDispatchToProps = dispatch => ({
    onChangeX: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'xc', value }),
    onChangeY: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'yc', value }),
    onChangeR: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'rc', value }),
    onChangeMsg: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'message', value }),// todo
    onSubmit: (x, y, r) => {
        dispatch({ type: POINT_ADDED, payload: agent.Points.new(x, y, r), r })
    },
    changeWithMsg: (varname, value, msg) => {
        dispatch({ type: UPDATE_WITH_MESSAGE, key: varname, value, message: msg })
    }
});

class PointInput extends React.Component {

    changeX = ev => this.props.onChangeX(ev.target.value.substring(0, 10));

    changeY = ev => this.props.onChangeY(ev.target.value.substring(0, 10));

    changeR = ev => this.props.onChangeR(ev.value);


    submitForm = (x, y, r) => ev => {
        ev.preventDefault();

        this.props.onSubmit(x, y, r);
    };

    render() {
        const x = this.props.xc;
        const y = this.props.yc;
        const r = this.props.rc;
        const msg = this.props.message;

        //alert(x+' '+y+' '+r+' '+msg);

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">

                            <ListErrors errors={this.props.errors} />

                            <form onSubmit={this.submitForm(x, y, r)}>
                                <fieldset>

                                    <div className="message">{msg}</div>

                                    <fieldset className="form-group">
                                        X:<TextInput className="form-control form-control-lg" onChange={this.changeX} value={x} placeholder="(-5;5)"></TextInput>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        Y:<TextInput className="form-control form-control-lg" onChange={this.changeY} value={y} placeholder="(-5;5)"></TextInput>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        R:<TextInput className="form-control form-control-lg" onUpdate={this.changeR} value={r} placeholder="(-5;5)"></TextInput>
                                    </fieldset>


                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit"
                                        disabled={msg && msg != ''}>
                                        CHECK
                                    </button>

                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PointInput);
