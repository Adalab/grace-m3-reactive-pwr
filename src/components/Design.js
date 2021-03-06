import React from "react";
import Colors from "./Color";
import "../stylesheets/design.scss";

class Design extends React.Component {
  constructor() {
    super();
    this.state = {
      class: "collapsable"
    };
    this.putHiddenClass = this.putHiddenClass.bind(this);
  }
  putHiddenClass() {
    let nextState;
    this.setState(prevState => {
      if (prevState.class === "collapsable") {
        nextState = "";
      } else {
        nextState = "collapsable";
      }
      return {
        class: nextState
      };
    });
  }

  render() {
    return (
      <section className={`design  js-collapse ${this.state.class}`}>
        <div className="design__title" onClick={this.putHiddenClass}>
          <h2 className="design__title__text home--title">
            <i className="design__title__icon far fa-object-ungroup"></i>Diseña
          </h2>
          <button className="design__title__btn js-btn-collapse">
            <i className="fa fa-chevron-up icon"></i>
          </button>
        </div>
        <div className="design__colors collapse">
          <p className="design__colors__text home--subtitle">Colores</p>
          <div className="design__colors__choose js-palett-choose">
            <Colors
              colorClass="blue"
              id="blue"
              inputvalue="1"
              data={this.props.data}
              actionToForm={this.props.actionToForm}
            />
            <Colors
              colorClass="red"
              id="red"
              inputvalue="2"
              data={this.props.data}
              actionToForm={this.props.actionToForm}
            />
            <Colors
              colorClass="yell"
              id="yell"
              inputvalue="3"
              data={this.props.data}
              actionToForm={this.props.actionToForm}
            />
            <Colors
              colorClass="gre"
              id="gre"
              inputvalue="4"
              data={this.props.data}
              actionToForm={this.props.actionToForm}
            />
            <Colors
              colorClass="pur"
              id="pur"
              inputvalue="5"
              data={this.props.data}
              actionToForm={this.props.actionToForm}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Design;
