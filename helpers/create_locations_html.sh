#! /usr/bin/bash

input_file="locations.txt"
output_file="output.html"

# Start the HTML file
echo "<!DOCTYPE html>" > "$output_file"
echo "<html>" >> "$output_file"
echo "<head>" >> "$output_file"
echo "  <title>Options</title>" >> "$output_file"
echo "</head>" >> "$output_file"
echo "<body>" >> "$output_file"

# Read the input file line by line
while IFS= read -r line
do
  # Generate an option element for each line
  echo "  <option value=\"$line\">$line</option>" >> "$output_file"
done < "$input_file"

# Close the HTML file
echo "</body>" >> "$output_file"
echo "</html>" >> "$output_file"

echo "HTML file '$output_file' generated successfully."