import json
import random
from faker import Faker

fake = Faker()

# Sample data lists
product_types = ["leggings", "sports bra", "underwear", "crop tops", "t-shirts"]
brands = ["GymShark", "My Protein", "Lululemon"]
sizes = ["extra small", "small", "medium", "large", "double large"]
colors = ["Black", "Gray", "Blue", "Red", "Pink", "Green"]


# Generate random activewear data
def generate_activewear_data(num_items):
    activewear_data = []
    for _ in range(num_items):
        category = "activewear"
        product_type = random.choice(product_types)
        brand = random.choice(brands)
        gender = "women"
        product_name = f"{brand} {product_type.capitalize()} {fake.word()}"
        is_on_discount = True  # Always on discount for this example
        original_price = round(random.uniform(20, 100), 2)  # Random price between $20 and $100
        discount_price = round(original_price * random.uniform(0.8, 0.95), 2)
        fit_type = random.choice(["tight", "loose", "regular"])
        number_of_ratings = random.randint(0, 100)
        average_rating = round(random.uniform(1, 5), 1)
        size_options = []
        for size in sizes:
            in_stock = random.choice([True, False])
            quantity = random.randint(0, 20) if in_stock else 0
            size_options.append({
                "Type": size,
                "Is in Stock": in_stock,
                "Quantity In Stock": quantity
            })
        sku = ''.join(random.choices('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=8))
        product_description = fake.paragraph()
        materials = random.choice(["Polyester", "Nylon", "Spandex", "Cotton", "Mesh"])

        activewear_data.append({
            "Category": category,
            "Product Type": product_type,
            "Product Name": product_name,
            "Gender": gender,
            "Brand": brand,
            "Is on Discount": is_on_discount,
            "Original Price": original_price,
            "Discount Price": discount_price,
            "Fit Type": fit_type,
            "Number of Ratings": number_of_ratings,
            "Average Rating": average_rating,
            "Size Options": size_options,
            "SKU": sku,
            "Product Description": product_description,
            "Materials": materials
        })
    return activewear_data


# Generate 20 random activewear products
activewear_records = generate_activewear_data(20)

# Output the generated data in JSON format
with open("activewear_records.json", "w") as json_file:
    json.dump(activewear_records, json_file, indent=4)

print("Generated 20 activewear records and saved to 'activewear_records.json'")
