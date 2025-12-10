import React, { Component } from "react";
import css from "./Headermenu.module.scss";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default class Headermenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavSideMenu: false,
      expandedNavDropdownOpened: false,
    };
  }

  // Toggle menú lateral móvil
  toggleNavSideMenu = (preventDefault, e) => {
    if (preventDefault && e) e.preventDefault();
    this.setState((prev) => ({
      showNavSideMenu: !prev.showNavSideMenu,
      expandedNavDropdownOpened: false,
    }));
  };

  // Cerrar dropdown móvil
  closeExpandedNavDropdown = () => {
    this.setState({ expandedNavDropdownOpened: false });
  };

  /* ================= MOBILE SIDE MENU ================= */
  navSideMenu = () => {
    return (
      <nav
        {...storyblokEditable(this.props.blok)}
        className={css["main-header__expanded-nav"]}
      >
        <ul
          className={css["main-header__expanded-nav-list"]}
          onClick={this.closeExpandedNavDropdown}
        >
          {/* Logo */}
          <li className={css["main-header__expanded-nav-item--home"]}>
            <a href="/">
              <div className={css["main-header__nav-home-container"]}>
                <img
                  src="/images/logo/logo.png"
                  alt="logo"
                  className={css["main-header__nav-home-logo"]}
                />
              </div>
            </a>
          </li>

          {/* Menú dinámico desde Storyblok */}
          {this.props.blok.menucontent?.map((nestedBlok, index) => (
            <li
              key={nestedBlok._uid}
              className={css[`main-header__expanded-nav-item--${index}`]}
            >
              <StoryblokComponent
                blok={nestedBlok}
                mobile={true}
                last={false}
                index={index}
              />
            </li>
          ))}
        </ul>

        {/* Fondo oscurecido */}
        <div
          className={css["main-header__expanded-greyed-out-zone"]}
          role="button"
          tabIndex={-1}
          onClick={(e) => this.toggleNavSideMenu(true, e)}
        />
      </nav>
    );
  };

  /* ================= RENDER ================= */
  render() {
    return (
      <>
        <header {...storyblokEditable(this.props.blok)} className={css["main-header"]}>
          <nav className={css["main-header__nav"]}>
            
            {/* Logo principal */}
            <div className={css["main-header__nav-home"]}>
              <a href="/">
                <div className={css["main-header__nav-home-container"]}>
                  <img
                    src="/images/logo/logo.png"
                    alt="logo"
                    className={css["main-header__nav-home-logo"]}
                  />
                </div>
              </a>
            </div>

            {/* Menú desktop */}
            <ul className={css["main-header__nav-list"]}>
              {/* Icono menú móvil */}
              <li className={css["main-header__nav-item--menu"]}>
                <span
                  className="mdi mdi-menu"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => this.toggleNavSideMenu(true, e)}
                />
              </li>

              {/* Links del menú (desktop) */}
              {this.props.blok.menucontent?.map((nestedBlok, index) => (
                <li
                  key={nestedBlok._uid}
                  className={css[`main-header__nav-item--${index}`]}
                >
                  <StoryblokComponent
                    blok={nestedBlok}
                    last={false}
                    index={index}
                    mobile={false}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar móvil */}
          {this.state.showNavSideMenu && this.navSideMenu()}
        </header>
      </>
    );
  }
}
