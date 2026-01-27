from load_data import load_faculty_data

df = load_faculty_data()

df["bio_length"] = df["biography"].fillna("").apply(len)

print("Average biography length:", df["bio_length"].mean())
print("Max biography length:", df["bio_length"].max())