import React, { Component } from "react";
import css from "./Headermenu.module.scss";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default class Headermenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavSideMenu: false,
      showSearchFlyout: false,
      expandedNavDropdownOpened: false
    };
  }

  toggleNavSideMenu(setPreventDefault, e) {
    if (setPreventDefault) {
      e.preventDefault();
    }
    this.setState((prevState) => ({
      showNavSideMenu: !prevState.showNavSideMenu,
      expandedNavDropdownOpened: false
    }));
  }

  toggleExpandedNavDropdown(e) {
    e.stopPropagation();
    this.setState((prevState) => ({
      expandedNavDropdownOpened: !prevState.expandedNavDropdownOpened
    }));
  }

  closeExpandedNavDropdown() {
    this.setState({
      expandedNavDropdownOpened: false
    });
  }

  navSideMenu() {
    return (
      <nav
        {...storyblokEditable(this.props.blok)}
        className={css["main-header__expanded-nav"]}
      >
        <ul
          className={[css["main-header__expanded-nav-list"]].join("\n")}
          onClick={this.closeExpandedNavDropdown.bind(this)}
        >
          <li
            className={css["main-header__expanded-nav-item--home"]}
            key="mainlogo"
          >
            <a href="/">
              <div className={css["main-header__nav-home-container"]}>
                {/* LOGO EN EL MENÚ MÓVIL */}
                <img
                  src="/images/logo/logo.png"
                  alt="Serrano & Bretzel logo"
                  className={css["main-header__nav-home-logo"]}
                />
              </div>
            </a>
          </li>

          {this.props.blok.menucontent.map((nestedBlok, index) => {
            return (
              <li
                className={css[`main-header__expanded-nav-item--${index}`]}
                key={nestedBlok._uid}
              >
                <StoryblokComponent
                  blok={nestedBlok}
                  last={false}
                  index={index}
                  mobile={true}
                />
              </li>
            );
          })}
        </ul>

        <div
          className={css["main-header__expanded-greyed-out-zone"]}
          role="button"
          tabIndex={-1}
          onKeyPress={this.toggleNavSideMenu.bind(this, true)}
          onClick={this.toggleNavSideMenu.bind(this, true)}
        />
      </nav>
    );
  }

  render() {
    return (
      <>
        <header
          {...storyblokEditable(this.props.blok)}
          className={css["main-header"]}
        >
          <nav className={css["main-header__nav"]}>
            {/* LOGO IZQUIERDA */}
            <nav className={css["main-header__nav-home"]}>
              <a href="/">
                <div className={css["main-header__nav-home-container"]}>
                  <img
                    src="/images/logo/logo.png"
                    alt="Serrano & Bretzel logo"
                    className={css["main-header__nav-home-logo"]}
                  />
                </div>
              </a>
            </nav>

            {/* LINKS + HAMBURGUESA A LA DERECHA */}
            <ul className={css["main-header__nav-list"]}>
              {/* LINKS: Home, Restaurants, Our Plates… */}
              {this.props.blok.menucontent.map((nestedBlok, index) => {
                return (
                  <li
                    className={css[`main-header__nav-item--${index}`]}
                    key={nestedBlok._uid}
                  >
                    <StoryblokComponent
                      blok={nestedBlok}
                      last={false}
                      index={index}
                      mobile={false}
                    />
                  </li>
                );
              })}

              {/* ICONO MENÚ HAMBURGUESA AL FINAL */}
              <li
                key="sidenav"
                className={css["main-header__nav-item--menu"]}
              >
                <span
                  className="mdi mdi-menu"
                  role="button"
                  tabIndex={0}
                  onKeyPress={this.toggleNavSideMenu.bind(this, true)}
                  onClick={this.toggleNavSideMenu.bind(this, true)}
                />
              </li>
            </ul>
          </nav>

          {this.state.showNavSideMenu ? this.navSideMenu() : <></>}
        </header>
      </>
    );
  }
}
