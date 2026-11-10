# Here you will find a explanation of some components.

<p align="center"> Enjoy! 😀</p>

## Main Page

### Profile card
The home card tilts only while a mouse or pen is over it, and eases back when the pointer leaves. Touch and `prefers-reduced-motion` skip the tilt. The theme button crossfades the moon and the sun, and the page reveals the new theme from that button.

### Back to top
`floatingbutton.vue` listens to `window` `scroll` while it is mounted and removes that listener on unmount. The button stays out of the tab order until the page has scrolled.

## About Page

### Carousel
Technologies render twice so the track can loop. The second copy is `aria-hidden` and removed from the tab order. Each logo is masked from `/vue.svg` (and the other absolute icon paths) and takes a brand color that lightens in the dark theme. A chip links to the public project that uses that technology, or to the GitHub profile for Git.

```vue
<scrollComponent v-for="tech in techs" :key="tech.name" :name="tech.name" :label="tech.label" />
<scrollComponent v-for="tech in techs" :key="`${tech.name}-copy`" :name="tech.name" :label="tech.label" duplicate />
```

## Projects Page

### Fetch Projects
`ProjectView.vue` loads repositories from `https://api.github.com/users/pedromedem/repos` when the view is mounted. Loading, error, and empty each have their own state. Forks, this portfolio, and the profile README are filtered out. `projectCard.vue` only builds a live URL when `homepage` is a valid `http` or `https` address, and it falls back to a gradient if the screenshot fails.
