import { storyblokEditable } from "@storyblok/react";
import React from "react";
import css from "./Menulink.module.scss";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Menulink({ blok, last, mobile }) {
  const router = useRouter();

  const linkUrl = blok?.link?.cached_url || "/";
  const hasSubmenu = blok.submenulinks && blok.submenulinks.length > 0;

  // --------------------------------------------
  // SMART LINK HANDLER → scroll si es un anchor
  // --------------------------------------------
  const handleClick = async (event, url) => {
    if (!url.includes("#")) return; // no es anchor → dejar comportamiento normal

    event.preventDefault();

    const [path, anchor] = url.split("#");

    if (router.pathname !== `/${path}`) {
      // Si NO estamos en esa página → navegación + scroll al cargar
      router.push(`/${path}`).then(() => {
        setTimeout(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      });
    } else {
      // Si YA estamos en esa página → scroll directo
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= MOBILE ================= */}
      {mobile && (
        <div {...storyblokEditable(blok)} className={css["mobile-main-header__nav-item-inner"]}>
          <Link href={linkUrl}>
            <a
              onClick={(e) => handleClick(e, linkUrl)}
              className={css["buttonlink-" + last]}
            >
              <span>
                {RichTextToHTML({
                  document: blok.name,
                  textClassName: css["main-header__dropdown-item-maintext"],
                  boldClassName: css["main-header__dropdown-item-text--highlighted"],
                })}
              </span>
            </a>
          </Link>

          {hasSubmenu && (
            <div className={css["mobile-main-header__nav-dropdown-wrapper"]}>
              <div className={css["mobile-main-header__nav-dropdown"]}>
                {blok.submenulinks.map((sub) => {
                  const subUrl = sub.link.cached_url;

                  return (
                    <Link key={sub._uid} href={`/${subUrl}`}>
                      <a
                        className={css["mobile-main-header__dropdown-item-container"]}
                        onClick={(e) => handleClick(e, subUrl)}
                      >
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= DESKTOP ================= */}
      {!mobile && (
        <div {...storyblokEditable(blok)} className={css["main-header__nav-item-inner"]}>
          <Link href={linkUrl}>
            <a
              onClick={(e) => handleClick(e, linkUrl)}
              className={css["buttonlink-" + last]}
            >
              <span>
                {RichTextToHTML({
                  document: blok.name,
                  textClassName: css["main-header__dropdown-item-maintext"],
                  boldClassName: css["main-header__dropdown-item-text--highlighted"],
                })}
              </span>
            </a>
          </Link>

          {hasSubmenu && (
            <div className={css["main-header__nav-dropdown-wrapper"]}>
              <div className={css["main-header__nav-dropdown"]}>
                {blok.submenulinks.map((sub) => {
                  const subUrl = sub.link.cached_url;

                  return (
                    <Link key={sub._uid} href={`/${subUrl}`}>
                      <a
                        className={css["main-header__dropdown-item-container"]}
                        onClick={(e) => handleClick(e, subUrl)}
                      >
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
