import React, { Component } from "react";

//import Provider from './falk/Provider'

//import Mapper from './Mapper'
import Falk, { Provider, Layout, Button, Icon } from "./falk";

//styles

import "./falk/styl/style.styl";

// auto reload

import "./logo/style.css";

const Navigation = () =>
  Falk.init("Navigation")
    .fetch(
      "https://raw.githubusercontent.com/FalkZ/gmar/master/content/page.md"
    )
    .chop("##", { extract: true, noZero: true })
    .construct({ content: "this.extract", className: "this.extract" }, {})
    .tag("nav")
    .prepare("span");

const Two = () =>
  Falk.init("Two")
    .get(Falk.Navigation, 0)
    .markdown()
    .prepare("span");

const SocialMedia = () =>
  Falk.init("SocialMedia")
    .add(["facebook", "instagram", "youtube"])
    .construct({ name: "this" }, {})
    .tag(Icon)
    .construct(
      {
        content: "this",
        return: "props.children.props.name",
        onClick: bla => console.log(bla)
      },
      {}
    )
    .tag(Button)
    .prepare("span");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Provider logger="this">
          <i className="gmar-Joker" id="background" />
          <header>
            <i className="gmar-Joker" />

            <h1>GIVE ME A REASON</h1>

            <Layout right>
              <SocialMedia />
            </Layout>

            <Layout right>
              <Navigation />
            </Layout>
          </header>
          <section>
            <Two />
          </section>
        </Provider>
      </div>
    );
  }
}

export default App;
