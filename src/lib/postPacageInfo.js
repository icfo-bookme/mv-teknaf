const postPackageInfo = async (packageData) => {
  try {
    const res = await fetch(
      `${rocess.env.NEXT_PUBLIC_BASE_URL}/api/tour-consultationsp`,
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(packageData), 
        cache: "no-store", 
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to post package info: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error posting package info:", error);
    return { error: error.message }; // Return error message
  }
};

export default postPackageInfo;