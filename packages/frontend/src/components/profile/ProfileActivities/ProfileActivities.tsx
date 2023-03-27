import Image from 'next/image';

const DUMMY_ACTIVITIES: {
  id: string;
  img: string;
  name: string;
  comicTitle: string;
}[] = [
  {
    id: Math.random().toString().slice(-6),
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Philips',
    comicTitle: 'Wolverine',
  },
  {
    id: Math.random().toString().slice(-6),
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Philips',
    comicTitle: 'Wolverine',
  },
  {
    id: Math.random().toString().slice(-6),
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Philips',
    comicTitle: 'Wolverine',
  },
];

const ProfileActivities = () => (
  <div className="flex flex-col gap-8">
    {DUMMY_ACTIVITIES.map(({
      id, img, name, comicTitle,
    }) => (
      <div
        key={id}
        className="w-full rounded-lg h-12 bg-gray-200 flex m-auto center md:w-1/3"
      >
        <Image
          className="w-6 h-6 object-cover self-center m-4 rounded-full"
          src={img}
          alt={name}
        />
        <div className="self-center text-sm sm:text-base">
          <span>You</span>
          <span className="font-bold px-1 ">
            exchanged
            {comicTitle}
          </span>
          <span>
            with
            {name}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default ProfileActivities;
