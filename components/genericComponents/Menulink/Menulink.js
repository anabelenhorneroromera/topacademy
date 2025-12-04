import { storyblokEditable } from "@storyblok/react";
import React from "react";
import css from "./Menulink.module.scss";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import Link from "next/link";

export default function Menulink({ blok, last, mobile }) {
  const linkUrl = blok?.link?.cached_url || "/";
  const hasSubmenu = blok.submenulinks && blok.submenulinks.length > 0;

  return (
    <>
      {/* ================= MOBILE ================= */}
      {mobile && (
        <div
          {...storyblokEditable(blok)}
          className={css["mobile-main-header__nav-item-inner"]}
        >
          {/* Enlace principal */}
          <Link href={linkUrl}>
            <a className={css["buttonlink-" + last]}>
              <span>
                {RichTextToHTML({
                  document: blok.name,
                  textClassName: css["main-header__dropdown-item-maintext"],
                  boldClassName: css["main-header__dropdown-item-text--highlighted"],
                })}
              </span>
            </a>
          </Link>

          {/* SUBMENÚ MOBILE */}
          {hasSubmenu && (
            <div className={css["mobile-main-header__nav-dropdown-wrapper"]}>
              <div className={css["mobile-main-header__nav-dropdown"]}>
                {blok.submenulinks.map((sub) => (
                  <Link key={sub._uid} href={"/" + sub.link.cached_url}>
                    <a className={css["mobile-main-header__dropdown-item-container"]}>
                      {sub.icon?.filename && (
                        <img
                          src={sub.icon.filename}
                          alt={sub.icon.alt || "submenu icon"}
                          className={css["submenu-image"]}
                        />
                      )}

                      <span>
                        {RichTextToHTML({
                          document: sub.name,
                          textClassName: css["main-header__dropdown-item-text"],
                          boldClassName: css["main-header__dropdown-item-text--highlighted"],
                        })}
                      </span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= DESKTOP ================= */}
      {!mobile && (
        <div
          {...storyblokEditable(blok)}
          className={css["main-header__nav-item-inner"]}
        >
          {/* Enlace principal */}
          <Link href={linkUrl}>
            <a className={css["buttonlink-" + last]}>
              <span>
                {RichTextToHTML({
                  document: blok.name,
                  textClassName: css["main-header__dropdown-item-maintext"],
                  boldClassName: css["main-header__dropdown-item-text--highlighted"],
                })}
              </span>
            </a>
          </Link>

          {/* SUBMENÚ DESKTOP */}
          {hasSubmenu && (
            <div className={css["main-header__nav-dropdown-wrapper"]}>
              <div className={css["main-header__nav-dropdown"]}>
                {blok.submenulinks.map((sub) => (
                  <Link key={sub._uid} href={"/" + sub.link.cached_url}>
                    <a className={css["main-header__dropdown-item-container"]}>
                      {sub.icon?.filename && (
                        <img
                          src={sub.icon.filename}
                          alt={sub.icon.alt || "submenu icon"}
                          className={css["submenu-image"]}
                        />
                      )}

                      <span>
                        {RichTextToHTML({
                          document: sub.name,
                          textClassName: css["main-header__dropdown-item-text"],
                          boldClassName: css["main-header__dropdown-item-text--highlighted"],
                        })}
                      </span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
