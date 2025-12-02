// specificComponents/OurPlates.js
import React from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import styles from "./OurPlates.module.scss"; // asegúrate del nombre/ruta

export default function OurPlates({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={styles["restaurants-page"]}
      key={blok._uid}
    >
      <div className={styles["restaurants-page__main-content"]}>
        {/* Título principal */}
        {blok.title && <h2 className={styles["restaurants-page__title"]}>{blok.title}</h2>}

        {/* Subtítulo opcional */}
        {blok.subtitle && (
          <p className={styles["restaurants-page__short-description"]}>
            {blok.subtitle}
          </p>
        )}

        {/* Imagen principal opcional */}
        {blok.image && blok.image.filename && (
          <img
            src={blok.image.filename}
            alt={blok.image.alt || "Our Plates"}
          />
        )}

        {/* Descripción larga */}
        {blok.description && (
          <div className={styles["restaurants-page__description"]}>
            <p>{blok.description}</p>
          </div>
        )}

        {/* Platos / items anidados */}
        {blok.items &&
          blok.items.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
      </div>
    </section>
  );
}
