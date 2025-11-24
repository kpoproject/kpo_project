import json
from typing import List, Dict, Any


def parse_books(file_path: str) -> List[Dict[str, Any]]:
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    books = []
    for doc in data.get('docs', []):
        author_names = doc.get('author_name', [])
        author = ', '.join(author_names[:3]) if author_names else "None"
        book = {
            'title': doc.get('title', ''),
            'author': author,
            'year': doc.get('first_publish_year')
        }
        books.append(book)
    return books
