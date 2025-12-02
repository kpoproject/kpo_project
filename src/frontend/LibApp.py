import json
import os

from textual.app import App, ComposeResult
from textual.widgets import Input
from textual.containers import Vertical, Container, VerticalScroll
from textual.binding import Binding
from inputSection import InputSection
from parseBooks import parse_books
from booksContainer import BookContainer
from userContainer import UserInfoContainer
from LoginForm import LoginForm
from ScreenPop import ScreenPop


class MainGridContainer(Container):
    def compose(self) -> ComposeResult:
        with VerticalScroll(id="input-container"):
            yield InputSection(
                section_title="Первое поле ввода",
                input_placeholder="Поле для поиска в API...",
                on_enter_callback=self.app.save_to_file_1,
                id="section1"
            )
            yield InputSection(
                section_title="Второе поле ввода",
                input_placeholder="Поле для поиска в личной библиотеке...",
                on_enter_callback=self.app.save_to_file_2,
                id="section2"
            )

        with VerticalScroll(id="right-pane"):
            books = parse_books("books.json")
            for number in range(len(books)):
                book_container = BookContainer(
                    books[number],
                    add_to_lib=self.app.add_book_to_library,
                    rem_in_lib=self.app.remove_book_from_library
                )
                self.app.book_containers.append(book_container)
                yield book_container

        yield UserInfoContainer(
            self.app.current_user,
            self.app.user_books_count,
            self.app.logout,
            id="user-info"
        )


class LibApp(App):
    CSS_PATH = "LibApp.tcss"

    BINDINGS = [
        Binding("f1", "focus_first", "Фокус 1", show=True),
        Binding("f2", "focus_second", "Фокус 2", show=True),
        Binding("ctrl+c", "quit", "Выход", show=True),
        Binding("f3", "toggle_panes", "Свернуть/развернуть панели", show=True),

        Binding("j", "scroll_down", "Вниз", show=True),
        Binding("k", "scroll_up", "Вверх", show=True),

        Binding("ctrl+down", "focus_next_book", "Следующая книга", show=True),
        Binding("ctrl+up", "focus_previous_book", "Предыдущая книга", show=True),
    ]

    def __init__(self):
        super().__init__()
        self.panes_collapsed = False
        self.current_user = "Гость"
        self.user_books_count = 0
        self.last_focused_book = None
        self.book_containers = []
        self.main_container = None

        self.auto_login_attempted = False
        self.config_file = "user_config.json"

    def show_login_screen(self) -> None:
        login_form = LoginForm(
            on_login=self._handle_login,
            on_register=self._handle_register
        )
        screen_pop = ScreenPop(
            content_widget=login_form,
            on_close=self._on_login_close
        )

        self.hideMainContainer()

        self.app.push_screen(screen_pop)

    def _on_login_close(self) -> None:
        self.showMainContainer()

    def compose(self) -> ComposeResult:
        self.main_container = MainGridContainer(id="main-grid-container")
        self.main_container.styles.display = "none"
        yield self.main_container

    def on_mount(self) -> None:
        for book_container in self.book_containers:
            book_container.set_focus_handler(self._on_book_focused)
        self.showMainContainer()

        if self.has_saved_user():
            self.attempt_auto_login()




    def has_saved_user(self) -> bool:
        return os.path.exists(self.config_file)

    def load_config(self):
        if not os.path.exists(self.config_file):
            return None

        try:
            with open(self.config_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Ошибка при загрузке конфигурации: {e}")
            return None

    def save_config(self, username: str, password: str) -> None:
        config = {
            "username": username,
            "password": password
        }

        try:
            with open(self.config_file, "w", encoding="utf-8") as f:
                json.dump(config, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Ошибка при сохранении конфигурации: {e}")

    def clear_config(self) -> None:
        if os.path.exists(self.config_file):
            try:
                os.remove(self.config_file)
            except Exception as e:
                print(f"Ошибка при удалении конфигурации: {e}")

    def get_saved_credentials(self):
        config = self.load_config()
        if config:
            username = config.get("username")
            password = config.get("password")
            if username and password:
                return username, password
        return None

    def attempt_auto_login(self) -> None:
        self.auto_login_attempted = True

        credentials = self.get_saved_credentials()
        if credentials:
            username, saved_password = credentials
            if self._check_credentials(username, saved_password):
                self._perform_auto_login(username, saved_password)


    def _perform_auto_login(self, username: str, password: str) -> bool:
        if username and password:
            self.current_user = username
            self.user_books_count = 0

            self.update_user_info_display()

            self.showMainContainer()
            return True
        else:
            return False

    def _check_credentials(self, username: str, password: str) -> bool:
        if username == "admin" and password == "admin1":
            return True

        return bool(username.strip() and password.strip())








    def _on_book_focused(self, book_container: BookContainer) -> None:
        self.last_focused_book = book_container

    def is_focus_on_books(self) -> bool:
        focused = self.focused
        if focused and isinstance(focused, BookContainer):
            return True
        return False

    def action_focus_next_book(self) -> None:
        if not self.book_containers:
            return

        if not self.is_focus_on_books():
            if self.last_focused_book and self.last_focused_book in self.book_containers:
                self.last_focused_book.focus()
            else:
                self.book_containers[0].focus()
        else:
            current_index = self.get_current_book_index()
            next_index = (current_index + 1) % len(self.book_containers)
            self.book_containers[next_index].focus()

    def action_focus_previous_book(self) -> None:
        if not self.book_containers:
            return

        if not self.is_focus_on_books():
            if self.last_focused_book and self.last_focused_book in self.book_containers:
                self.last_focused_book.focus()
            else:
                self.book_containers[0].focus()
        else:
            current_index = self.get_current_book_index()
            prev_index = (current_index - 1) % len(self.book_containers)
            self.book_containers[prev_index].focus()

    def get_current_book_index(self) -> int:
        if self.is_focus_on_books():
            return self.book_containers.index(self.focused)
        elif self.last_focused_book and self.last_focused_book in self.book_containers:
            return self.book_containers.index(self.last_focused_book)
        return 0

    def action_scroll_down(self) -> None:
        right_pane = self.query_one("#right-pane", VerticalScroll)
        right_pane.scroll_down()

    def action_scroll_up(self) -> None:
        right_pane = self.query_one("#right-pane", VerticalScroll)
        right_pane.scroll_up()

    def action_focus_first(self) -> None:
        section1 = self.query_one("#section1", InputSection)
        section1.query_one("#text-input", Input).focus()

    def action_focus_second(self) -> None:
        section2 = self.query_one("#section2", InputSection)
        section2.query_one("#text-input", Input).focus()

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

    def _handle_login(self, username: str, password: str) -> bool:
        if username == "admin" and password == "admin1":
            self.current_user = username
            self.user_books_count = 0

            # под перенос
            self.save_config(username, password)
            self.update_user_info_display()


            return True
        return False

    def _handle_register(self, username: str, password: str) -> bool:
        self.current_user = username
        self.user_books_count = 0

        #под перенос
        self.save_config(username, password)
        self.update_user_info_display()
        return True

    def update_user_info_display(self) -> None:
        try:
            user_info_container = self.query_one("#user-info", UserInfoContainer)
            user_info_container.update_user_info(self.current_user, self.user_books_count)
        except Exception as e:
            print(f"Ошибка при обновлении информации о пользователе: {e}")

    def logout(self) -> None:
        self.hideMainContainer()
        self.show_login_screen()

    def increment_books_count(self) -> None:
        self.user_books_count += 1
        self.update_user_info_display()

    def decrement_books_count(self) -> None:
        if self.user_books_count > 0:
            self.user_books_count -= 1
            self.update_user_info_display()

    def set_books_count(self, count: int) -> None:
        self.user_books_count = count
        self.update_user_info_display()

    def add_book_to_library(self, book: dict) -> None:
        try:
            filename = "lib.txt"
            with open(filename, "a", encoding="utf-8") as file:
                from datetime import datetime
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                file.write(f"[{timestamp}] | Добавлено | {book.items()}\n")

            self.increment_books_count()
            print(f"Книга '{book.get('title', 'Unknown')}' добавлена в библиотеку")

        except Exception as e:
            print(f"Ошибка при добавлении книги: {e}")

    def remove_book_from_library(self, book: dict) -> None:
        try:
            filename = "lib.txt"
            with open(filename, "a", encoding="utf-8") as file:
                from datetime import datetime
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                file.write(f"[{timestamp}] | Удалено | {book.items()}\n")

            self.decrement_books_count()
            print(f"Книга '{book.get('title', 'Unknown')}' удалена из библиотеки")

        except Exception as e:
            print(f"Ошибка при удалении книги: {e}")


    def hideMainContainer(self):
        if self.main_container:
            self.main_container.display = False

    def showMainContainer(self):
        if self.main_container:
            self.main_container.display = True
            self.main_container.styles.display = "block"
            self.action_focus_first()


if __name__ == "__main__":
    app = LibApp()
    app.run()
