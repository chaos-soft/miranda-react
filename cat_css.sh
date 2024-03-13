cat \
    public/store/common.css \
    public/store/2b.css \
    public/store/jill.css \
    public/store/main.css \
    public/store/stream.css | \
        tr -s ' ' | tr -d '\n' > public/store/xxx.css
