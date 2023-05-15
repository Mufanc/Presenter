.PHONY : zip-all init build clean convert clean-env

zip-all: init build convert
	zip -r build/exports.zip build/*

init:
	pnpm i

build:
	@mkdir -p build
	cp index.md build/index.md
	pnpm run build
	pnpm run export --output build/export.pdf
	pnpm run export --with-clicks --output build/export-clicks.pdf
	pnpm run export:pptr $$(which chrome)

convert:
	ls build/*.pdf | xargs -I @ pnpm run convert @

clean:
	rm -rf build

clean-env:
	rm -rf venv
	rm -rf node_modules
