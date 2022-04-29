---
sidebar_position: 2
---

# Schema
See: [Schema](pathname:///schema.html)

Generated using https://github.com/coveooss/json-schema-for-humans
```
cd drg-custom-difficulties
generate-schema-doc cd.schema.json custom-difficulty-docs/static/schema.html
```

For whatever reason, that library won't generate an markdown file output even if I use "schema.md".
It still generates an HTML file. So I just did some workaround hack by just storing the generated
html file in `/static/` folder then linking to it as done above.