from textual.app import ComposeResult
from textual.widgets import Input, Button
from typing import Callable, Optional
from textual.containers import Container, Horizontal


class InputSection(Container):
    on_enter: Optional[Callable[[str], None]] = None

    DEFAULT_CSS = """
    InputSection {
        width: 100%;
        height: 50%;
        layout: grid;
        grid-size: 1;
    }

    .input-section {
        width: 100%;
        height: auto;
        margin: 1;
        border: round $accent;
        padding: 1;
        background: $panel;
    }

    #input-container {
        width: 100%;
        height: auto;
        align: center middle;
        layout: horizontal;
    }

    .text-input {
        width: 70%;
        margin-right: 1;
    }

    .save-button {
        width: 28%;
        min-width: 10;
    }
    """

    def __init__(
            self,
            section_title: str,
            input_placeholder: str,
            button_text: str,
            on_enter_callback: Optional[Callable[[str], None]] = None,
            *args, **kwargs
    ):
        super().__init__(*args, **kwargs)
        self.section_title = section_title
        self.input_placeholder = input_placeholder
        self.button_text = button_text
        self.on_enter = on_enter_callback
        self.add_class("input-section")

    def compose(self) -> ComposeResult:
        yield Horizontal(
            Input(
                placeholder=self.input_placeholder,
                id="text-input",
                classes="text-input"
            ),
            Button(
                self.button_text,
                variant="primary",
                id="save-button",
                classes="save-button"
            ),
            id="input-container"
        )

    def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "save-button":
            self._handle_save()

    def on_input_submitted(self, event: Input.Submitted) -> None:
        if event.input.id == "text-input":
            self._handle_save()

    def _handle_save(self) -> None:
        input_widget = self.query_one("#text-input", Input)
        text = input_widget.value.strip()

        if text:
            if self.on_enter:
                try:
                    self.on_enter(text)
                    input_widget.value = ""
                    input_widget.focus()
                except Exception as e:
                    pass
