// specificComponents/Restaurant.js
import React from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function Restaurant({ blok }) {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      {blok.name && <h2>{blok.name}</h2>}
      {blok.image && blok.image.filename && (
        <img src={blok.image.filename} alt={blok.image.alt || ""} />
      )}
      {blok.description && <p>{blok.description}</p>}
      {blok.items && blok.items.map(nestedBlok => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}

// lib/storyblok.js
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Restaurant from "../specificComponents/Restaurant";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    restaurant: Restaurant
  }
});

// pages/[...slug].js (o la página donde renderices la story)
import React from "react";
import { StoryblokComponent } from "@storyblok/react";

export default function Page({ story }) {
  if (!story || !story.content) {
    return <div>Loading…</div>;
  }
  return (
    <main>
      <StoryblokComponent blok={story.content} />
    </main>
  );
}
