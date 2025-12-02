from textual.screen import Screen
from textual.widget import Widget
from typing import Optional, Callable


class ScreenPop(Screen):
    def __init__(
            self,
            content_widget: Widget,
            on_close: Optional[Callable] = None,
            *args, **kwargs
    ):
        super().__init__(*args, **kwargs)
        self.content_widget = content_widget
        self.on_close = on_close

    def compose(self):
        self.content_widget.add_class("screen-pop-content")
        yield self.content_widget

    def pop(self) -> None:
        if self.on_close:
            self.on_close()
        self.app.pop_screen()

    def key_escape(self) -> None:
        self.pop()
        self.app.showMainContainer()
