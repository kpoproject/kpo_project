from textual.app import ComposeResult
from textual.widgets import Static, Button
from textual.containers import Container, Vertical
from typing import Callable


class BookContainer(Container):

    DEFAULT_CSS = """
    BookContainer {
        width: 100%;
        height: 10;
        margin: 1;
        padding: 1;
        border: round $accent;
        background: $panel;
        layout: grid;
        grid-size: 2 1;
        grid-columns: 5fr 1fr;
    }

    .book-title {
        text-style: bold;
        color: $text;
        margin-bottom: 1;
    }

    .book-author {
        color: $text-muted;
        margin-bottom: 1;
    }

    .book-year {
        color: $success;
    }

    .save-button {
        width: 28%;
        min-width: 10;
    }

    .save-button.added {
        background: $success;
        color: white;
    }
    
    .save-button.removed {
        background: $primary;
        color: white;
    }
    """

    def __init__(self,
                 book: dict,
                 add_to_lib: Callable[[dict], None],
                 rem_in_lib: Callable[[dict], None],
                 *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.book = book
        self.add_to_lib = add_to_lib
        self.rem_in_lib = rem_in_lib
        self.on_enter = self.add_to_lib
        self.is_added = False

    def compose(self) -> ComposeResult:
        yield Container(
            Vertical(
                Static(self.book['title'], classes="book-title"),
                Static(f"Автор: {self.book['author']}", classes="book-author"),
                Static(f"Год: {self.book['year']}", classes="book-year"),
            ),
        )
        yield Button(
            label="Добавить",
            variant="primary",
            id="save-button",
            classes="save-button removed",
        )

    def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "save-button":
            self._handle_save()

    def _handle_save(self) -> None:
        button = self.query_one("#save-button", Button)

        if not self.is_added:
            self.is_added = True
            button.label = "Убрать"
            button.remove_class("removed")
            button.add_class("added")
            self.add_to_lib(self.book)
        else:
            self.is_added = False
            button.label = "Добавить"
            button.remove_class("added")
            button.add_class("removed")
            self.rem_in_lib(self.book)


def add(book: dict, filename="lib.txt"):
    try:
        with open(filename, "a", encoding="utf-8") as file:
            from datetime import datetime
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            file.write(f"[{timestamp}] | Добавлено | {book.items()}\n")
    except Exception as e:
        print(f"Ошибка при 'сохранении' в {filename}: {e}")
        raise


def rem(book: dict, filename="lib.txt"):
    try:
        with open(filename, "a", encoding="utf-8") as file:
            from datetime import datetime
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            file.write(f"[{timestamp}] | Удалено | {book.items()}\n")
    except Exception as e:
        print(f"Ошибка при 'удалении' в {filename}: {e}")
        raise
