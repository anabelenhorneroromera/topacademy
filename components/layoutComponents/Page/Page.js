import { Component } from "react";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const blok = this.props.blok;

    return (
      <>
        <main {...storyblokEditable(blok)}>
          <Headermenu blok={this.props.menu?.content} />

          {/* ✔ Evita el crash si body no existe o no es array */}
          {Array.isArray(blok.body) &&
            blok.body.map((nestedBlok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))
          }
        </main>
      </>
    );
  }
}
