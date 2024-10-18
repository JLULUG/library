import csv
import json
import sys

COLNAME_MAP = {
    "ISBN": ("isbn", str),
    "豆瓣ID": (b'', lambda _: _),
    "豆瓣*": ("url", str),
    "书名": ("name", str),
    "作者": ("author", str),
    "分类": ("tags", str),
    "可用数*": ("avail", int),
    "馆藏数*": ("total", int),
    "来源*": ("source", str),
}


def main() -> list:
    header, *body = list(csv.reader(sys.stdin))
    json.dump([
        {
            col[0]: col[1](line[i])
            for i, k in enumerate(header)
            if (col := COLNAME_MAP.get(k, (k, lambda x: x)))
        }
        for line in body
    ], sys.stdout, ensure_ascii=False, skipkeys=True)


if __name__ == "__main__":
    main()
