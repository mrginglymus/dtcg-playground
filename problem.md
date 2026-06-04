Given the resolver in `resolver.json`, and assuming the output in `what-iwant.css`...

The following all work

```html
<div class="dark">
  <div class="orange">
    <div style="color: var(--color)">
      I'm dark orange
    </div>
  </div>
</div>
```

```html
<div class="dark orange">
  <div style="color: var(--color)">
    I'm dark orange
  </div>
</div>
```
```html
<div class="dark orange">
  <div class="blue">
    <div style="color: var(--color)">
      I'm dark blue
    </div>
  </div>
</div>
```

Figma and Terrazo's implementation of resolver accept a flattened
set of inputs, so resolution happens lazily at the point of usage, which
allows for application of contexts in _any_ order.


However, in CSS, the same doesn't apply:

```html
<div class="dark orange">
  <div class="light">
    <div style="color: var(--color)">
      I'm dark orange, but the author intent appears to be light orange
    </div>
  </div>
</div>
```

It would be helpful, therefore, if the resolution order could form a contract that states
that so long as each set/modifier is applied in a CSS heirarchy in the same order, everything will work.

In a purely orthogonal resolver (each token is defined _only_ in a single set or modifier) resolution
order serves no purpose whatsoever; however, it could be used to great effect for this.
