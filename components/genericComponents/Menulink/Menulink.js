import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
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
        <div {...storyblokEditable(blok)} className={css["mobile-main-header__nav-item-inner"]}>
          <Link href={linkUrl} className={css["buttonlink-" + last]}>
            {RichTextToHTML({
              document: blok.name,
              textClassName: css["main-header__dropdown-item-maintext"],
              boldClassName: css["main-header__dropdown-item-text--highlighted"]
            })}
          </Link>

          {hasSubmenu && (
            <div className={css["mobile-main-header__nav-dropdown-wrapper"]}>
              <div className={css["mobile-main-header__nav-dropdown"]}>
                {blok.submenulinks.map((submenulink) => (
                  <Link
                    key={submenulink._uid}
                    href={"/" + submenulink.link.cached_url}
                    className={css["mobile-main-header__dropdown-item-container"]}
                  >
                    {submenulink.icon?.filename && (
                      <img
                        src={submenulink.icon.filename}
                        alt={submenulink.icon.alt || "submenu icon"}
                        className={css["submenu-image"]}
                      />
                    )}

                    <div>
                      {RichTextToHTML({
                        document: submenulink.name,
                        textClassName: css["main-header__dropdown-item-text"],
                        boldClassName: css["main-header__dropdown-item-text--highlighted"]
                      })}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= DESKTOP ================= */}
      {!mobile && (
        <div {...storyblokEditable(blok)} className={css["main-header__nav-item-inner"]}>
          <Link href={linkUrl} className={css["buttonlink-" + last]}>
            {RichTextToHTML({
              document: blok.name,
              textClassName: css["main-header__dropdown-item-maintext"],
              boldClassName: css["main-header__dropdown-item-text--highlighted"]
            })}
          </Link>

          {hasSubmenu && (
            <div className={css["main-header__nav-dropdown-wrapper"]}>
              <div className={css["main-header__nav-dropdown"]}>
                {blok.submenulinks.map((submenulink) => (
                  <Link
                    key={submenulink._uid}
                    href={"/" + submenulink.link.cached_url}
                    className={css["main-header__dropdown-item-container"]}
                  >
                    {submenulink.icon?.filename && (
                      <img
                        src={submenulink.icon.filename}
                        alt={submenulink.icon.alt || "submenu icon"}
                        className={css["submenu-image"]}
                      />
                    )}

                    <div>
                      {RichTextToHTML({
                        document: submenulink.name,
                        textClassName: css["main-header__dropdown-item-text"],
                        boldClassName: css["main-header__dropdown-item-text--highlighted"]
                      })}
                    </div>
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
