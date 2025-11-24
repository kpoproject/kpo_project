from textual.app import App, ComposeResult
from textual.widgets import Input, Static
from textual.containers import Vertical, Container, VerticalScroll
from textual.binding import Binding
from inputSection import InputSection
from parseBooks import parse_books
from booksContainer import BookContainer
from booksContainer import add, rem
from userContainer import UserInfoContainer
from typing import Callable, Tuple, Optional

class LibApp(App):
    CSS_PATH = "LibApp.tcss"

    BINDINGS = [
        Binding("f1", "focus_first", "Фокус 1", show=True),
        Binding("f2", "focus_second", "Фокус 2", show=True),
        Binding("ctrl+c", "quit", "Выход", show=True),
        Binding("f3", "toggle_panes", "Свернуть/развернуть панели", show=True),
    ]

    def __init__(self):
        super().__init__()
        self.panes_collapsed = False
        self.current_user = "Гость"
        self.user_books_count = 0

    def compose(self) -> ComposeResult:
        with VerticalScroll(id="input-container"):
            yield InputSection(
                    section_title="Первое поле ввода",
                    input_placeholder="Поле для поиска в API...",
                    on_enter_callback=self.save_to_file_1,
                    id="section1"
                )
            yield InputSection(
                    section_title="Второе поле ввода",
                    input_placeholder="Поле для поиска в личной библиотеке...",
                    on_enter_callback=self.save_to_file_2,
                    id="section2"
                )

        with VerticalScroll(id="right-pane"):
            books = parse_books("books.json")
            for number in range(len(books)):
                yield BookContainer(books[number], add_to_lib=add, rem_in_lib=rem)

        yield UserInfoContainer(
            self.current_user,
            self.user_books_count,
            self.logout,
            id="user-info"
        )

    def logout(self) -> None:
        pass

    def action_toggle_panes(self) -> None:
        input_container = self.query_one("#input-container", VerticalScroll)
        right_pane = self.query_one("#right-pane", VerticalScroll)

        self.panes_collapsed = not self.panes_collapsed

        if self.panes_collapsed:
            input_container.display = False
            right_pane.styles.column_span = 2
            right_pane.styles.row_span = 3
        else:
            input_container.display = True
            right_pane.styles.column_span = 1
            right_pane.styles.row_span = 2

    def save_to_file_1(self, text: str) -> None:
        filename = "saved_text_1.txt"
        self._save_to_file(filename, text, 1)

    def save_to_file_2(self, text: str) -> None:
        filename = "saved_text_2.txt"
        self._save_to_file(filename, text, 2)

    def logout(self):
        pass

    def _save_to_file(self, filename: str, text: str, section_num: int) -> None:
        try:
            with open(filename, "a", encoding="utf-8") as file:
                from datetime import datetime
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                file.write(f"[{timestamp}] {text}\n")

            print(f"Текст сохранен в {filename}: {text}")

        except Exception as e:
            print(f"Ошибка при сохранении в {filename}: {e}")
            raise

    def action_focus_first(self) -> None:
        section1 = self.query_one("#section1", InputSection)
        section1.query_one("#text-input", Input).focus()

    def action_focus_second(self) -> None:
        section2 = self.query_one("#section2", InputSection)
        section2.query_one("#text-input", Input).focus()


if __name__ == "__main__":
    app = LibApp()
    app.run()
