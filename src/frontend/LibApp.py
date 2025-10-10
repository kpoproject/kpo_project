from textual.app import App, ComposeResult
from textual.widgets import Input, Static
from textual.containers import Vertical, Container, VerticalScroll
from textual.binding import Binding
from input_section import InputSection



class LibApp(App):
    CSS_PATH = "LibApp.tcss"

    BINDINGS = [
        Binding("f1", "focus_first", "Фокус 1", show=True),
        Binding("f2", "focus_second", "Фокус 2", show=True),
        Binding("ctrl+c", "quit", "Выход", show=True),
    ]

    def compose(self) -> ComposeResult:
        yield Container(
            Vertical(
                InputSection(
                    section_title="Первое поле ввода",
                    input_placeholder="Поле для поиска в API...",
                    button_text="Файл 1",
                    on_enter_callback=self.save_to_file_1,
                    id="section1"
                ),
                InputSection(
                    section_title="Второе поле ввода",
                    input_placeholder="Поле для поиска в личной библиотеке...",
                    button_text="Файл 2",
                    on_enter_callback=self.save_to_file_2,
                    id="section2"
                ),
            ),
            id="input-container"
        )

        with VerticalScroll(id="right-pane"):
            for number in range(15):
                yield Static(f"Vertical right-layout, child {number}")

        with VerticalScroll(id="left-pane"):
            for number in range(15):
                yield Static(f"Vertical left-layout, child {number}")

        yield Static("placeholder", id="bottom-pane")

    def save_to_file_1(self, text: str) -> None:
        filename = "saved_text_1.txt"
        self._save_to_file(filename, text, 1)

    def save_to_file_2(self, text: str) -> None:
        filename = "saved_text_2.txt"
        self._save_to_file(filename, text, 2)

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
