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
      "https://raw.githubusercontent.com/FalkZ/gmar-2/master/content/page.md"
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
    this.state = { language: "de" };
  }
  componentWillMount() {
    fetch(
      "https://raw.githubusercontent.com/FalkZ/gmar-2/master/content/deutsch.md"
    )
      .then(response => response.text())
      .then(text => {
        let temp = text.split("\n## ");
        let sections = [];
        temp.map((section, index) => {
          if (index !== 0) {
            sections[index - 1] = {
              name: section.split("\n")[0],
              content: "\n## " + section
            };
          }
          console.log(sections);
        });
      });
  }

  render() {
    return (
      <div>
        <Provider logger="this">
          <i className="gmar-Joker" id="background" />
          <header>
            <i className="gmar-Joker" id="logo" />

            <h1>GIVE ME A REASON</h1>

            <Layout right>
              <Button href="https://www.facebook.com/GiveMeAReasonOfficial">
                <Icon name="facebook" />
              </Button>
              <Button href="https://www.instagram.com/givemeareason_official/">
                <Icon name="instagram" />
              </Button>
              <Button href="https://www.youtube.com/channel/UCCMwf_diPCwrFHMdAhFVBWg">
                <Icon name="youtube" />
              </Button>
            </Layout>

            <Layout right>
              <Navigation />
            </Layout>
          </header>
          <section>
            <img src="https://scontent.fzrh1-1.fna.fbcdn.net/v/t1.0-9/21740477_351997008578631_5393184214769196740_n.jpg?oh=1b5fc3b8d9bc12c3993d3fc35fb87c87&amp;oe=5A703304" />

            <Two />
          </section>
        </Provider>
      </div>
    );
  }
}

export default App;
