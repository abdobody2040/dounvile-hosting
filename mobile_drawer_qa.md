# Mobile Drawer QA

| Check | Expected behavior | Evidence |
| --- | --- | --- |
| Open state | The drawer enters from the right over the mobile viewport. | Verified through the explicit `/?drawer=open` mobile preview. |
| Backdrop dismissal | Tapping the dimmed area closes the drawer. | The full-screen `mobile-nav-scrim` invokes the close action. |
| Escape dismissal | Pressing `Escape` closes the drawer. | The open-state keyboard handler covers the `Escape` key. |
| Keyboard containment | `Tab` and `Shift+Tab` remain within the drawer. | The focusable sequence is calculated inside the drawer and wrapped at both ends. |
| Background isolation | Background page content is unavailable while the drawer is open. | Primary page, footer, and header controls receive `inert` and `aria-hidden` during the open state. |
| Motion preference | Reduced-motion users receive an immediate drawer transition. | The drawer uses the shared reduced-motion setting with zero-duration alternatives. |
